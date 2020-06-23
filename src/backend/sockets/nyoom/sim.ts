import io from 'socket.io';

export class World {
	private server: io.Namespace;
	
	private players: object;
	
	public constructor(server: io.Namespace) {
		this.server = server;
		this.players = {};
	
		this.server.on('connection', (socket) => {
			console.log(`new nyoom connection: ${socket.id}`);
			
			this.players[socket.id] = new Player(socket);
			
			socket.on('disconnect', (reason) => {
				console.log(`${socket.id} disconnect for reason ${reason}`);

				delete this.players[socket.id];
			});
		});
	}
};

export class Player {
	private socket: io.Socket;
	
	private pos: { x: number, y: number };
	
	public constructor(socket: io.Socket) {
		this.socket = socket;
		
		this.pos = { x: 0, y: 0 };
	}
};