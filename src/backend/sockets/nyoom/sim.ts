import io from 'socket.io';

export interface KeyState {
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
};

export interface Input {
	keys: KeyState;
};

export interface Vector {
	x: number;
	y: number;	
};

export interface PlayerData {
	pos: Vector,
	vel: Vector,
};

export interface GameState {
	players: PlayerData[];
};

export class World {
	private server: io.Namespace;
	
	private players: { [id: string]: Player };
	
	public constructor(server: io.Namespace) {
		this.server = server;
		this.players = {};
	
		this.server.on('connection', (socket: io.Socket) => {
			// log the new connection
			console.log(`new nyoom connection: ${socket.id}`);
			
			// setup the player
			let player = new Player(socket);
			this.players[socket.id] = player;
			
			// on disconnect
			socket.on('disconnect', (reason) => {
				console.log(`${socket.id} disconnect for reason ${reason}`);

				delete this.players[socket.id];
			});
			
			// on player input
			socket.on('keyStateChange', (data: Input) => {
				player.handleKeyChange(data.keys);
				
				this.server.emit('update', this.serialize());
			});
		});
	}
	
	public update(dt: number) {
		Object.keys(this.players).forEach(k => this.players[k].update(dt));
	}
	
	private serialize(): GameState {
		return {
			players: Object.keys(this.players)
				.map(p => this.players[p].serialize()),
		};
	}
};

export class Player {
	private socket: io.Socket;
	
	private pos: Vector;
	private vel: Vector;
	
	private keyState: KeyState;
	
	public constructor(socket: io.Socket) {
		this.socket = socket;
		
		this.keyState = {
			left: false,
			right: false,
			up: false,
			down: false,
		};
		
		this.pos = { x: 0, y: 0 };
		this.vel = { x: 0, y: 0 };
	}
	
	public handleKeyChange(keys: KeyState) {
		this.keyState = keys;
	}
	
	public update(dt: number) {

	}
	
	public serialize(): PlayerData {
		return {
			pos: this.pos,
			vel: this.vel,
		};
	}
};