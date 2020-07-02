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
	id: string,
	pos: Vector,
	angle: number,
	avel: number,
	vel: number,
	keys: KeyState,
	username: string,
	color: number,
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

			this.server.emit('worldupdate', this.serialize());
			
			socket.on('setusername', (name) => {
				player.setUsername(name);
				this.server.emit('update', player.serialize());
			});
			
			// on disconnect
			socket.on('disconnect', (reason) => {
				console.log(`${socket.id} disconnect for reason ${reason}`);

				delete this.players[socket.id];
				
				this.server.emit('playerleave', socket.id);
			});
			
			// on player input
			socket.on('keyStateChange', (data: Input) => {
				if (!data.keys) {
					socket.disconnect();
				}
				
				player.handleKeyChange(data.keys);
				
				this.server.emit('update', player.serialize());
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
	private angle: number;
	private avel: number;
	private vel: number;
	
	private accel: number;
	private aaccel: number;
	
	private maxvel: number;
	private maxavel: number;
	
	private keys: KeyState;
	
	private username: string;
	private color: number;
	
	public constructor(socket: io.Socket) {
		this.socket = socket;
		
		this.keys = {
			left: false,
			right: false,
			up: false,
			down: false,
		};
		
		this.username = 'unnamed';
		
		this.pos = { x: 50, y: 50 };
		this.angle = 0;
		this.avel = 0;
		this.vel = 0;
		
		this.accel = 0.003;
		this.aaccel = 0.003;
		this.maxvel = 0.15;
		this.maxavel = 0.15;
		
		this.color = Math.floor(Math.random() * 0xFFFFFF);
	}
	
	public handleKeyChange(keys: KeyState) {
		this.keys = keys;
	}
	
	public update(dt: number) {
		if (this.keys.up) { this.vel += this.accel * dt; }
		else if (this.keys.down) { this.vel -= this.accel * dt; }
		else { this.vel = dampen(this.vel, this.maxvel) }
		
		if (this.keys.left) { this.avel += this.aaccel * dt; }
		else if (this.keys.right) { this.avel -= this.aaccel * dt; }
		else { this.avel = dampen(this.avel, this.maxavel) }
		
		if (this.vel > this.maxvel) { this.vel = this.maxvel }
		if (this.vel < -this.maxvel) { this.vel = -this.maxvel }

		if (this.avel > this.maxavel) { this.avel = this.maxavel }
		if (this.avel < -this.maxavel) { this.avel = -this.maxavel }
		
		this.angle -= this.avel * dt;
		
		let xv = Math.cos(deg2rad(this.angle)) * this.vel;
		let yv = Math.sin(deg2rad(this.angle)) * this.vel;
		
		this.pos.x += xv * dt;
		this.pos.y += yv * dt;
	}
	
	public setUsername(name: string) {
		this.username = name;
	}
	
	public serialize(): PlayerData {
		return {
			id: this.socket.id,
			pos: this.pos,
			vel: this.vel,
			angle: this.angle,
			avel: this.avel,
			keys: this.keys,
			username: this.username,
			color: this.color,
		};
	}
};

function dampen(v: number, max: number) {
	if (v > max / 2) {
		v -= max;
	} else if (v < -max / 2) {
		v += max;
	} else {
		v = 0;
	}
	return v;
};

function deg2rad(d: number) {
	return d * (Math.PI / 180);
};

function rad2deg(r: number) {
	return r * (180 / Math.PI);
};