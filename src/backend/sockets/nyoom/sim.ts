import io from 'socket.io';
import fs from 'fs';
import appRoot from 'app-root-path';
import { NyoomRacer } from '../../db/models/NyoomRacer';

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
	crad: number,
};

export interface GameState {
	players: PlayerData[];
};

export interface Tile {
	x: number,
	y: number,
	t: number,
};

export interface Checkpoint {
	x: number,
	y: number,
	w: number,
	h: number,	
};

const tileOffset = {
	x: 32*17,
	y: 32*2,
};

export class World {
	private server: io.Namespace;
	
	private players: { [id: string]: Player };
	
	private tiles: Tile[];
	
	public constructor(server: io.Namespace) {
		this.server = server;
		this.players = {};
		
		let map = JSON.parse(fs.readFileSync(appRoot.resolve('/assets/nyoom_map.json')).toString());
		let { width, tilewidth, tileheight } = map;
		this.tiles = map.layers[0].data
			.map((t: number, index: number) => {
				let x = (index % width) * tilewidth;
				let y = Math.floor(index / width) * tileheight; 
				
				x -= tileOffset.x;
				y -= tileOffset.y;
				
				return { x, y, t };
			})
			.filter((v: any) => v.t == 1);
		
		this.server.on('connection', (socket: io.Socket) => {
			// log the new connection
			console.log(`new nyoom connection: ${socket.id}`);
			
			// setup the player
			let player = new Player(socket);
			player.findUntouchedPos(Object.keys(this.players).map(p => this.players[p]), this.tiles);
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
		Object.keys(this.players).forEach(k => this.players[k].update(dt, this.players, this.tiles));
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
	
	private crad: number;
	
	private lastCheckpoint: number;
	private checkpoints: Checkpoint[];
	
	public constructor(socket: io.Socket) {
		this.socket = socket;
		
		this.keys = {
			left: false,
			right: false,
			up: false,
			down: false,
		};
		
		this.username = 'unnamed';
		
		this.pos = { x: 0, y: 0 };
		this.angle = 0;
		this.avel = 0;
		this.vel = 0;
		
		this.accel = 200;
		this.aaccel = 250;
		this.maxvel = 300;
		this.maxavel = 200;
		
		this.lastCheckpoint = 0;
		
		this.crad = 16;
		
		this.color = Math.floor(Math.random() * 0xFFFFFF);
		
		this.checkpoints = [
			{
				x: 16 * 32,
				y: 1 * 32,
				w: 2 * 32,
				h: 5 * 32,	
			},
			{
				x: 25 * 32,
				y: 30 * 32,
				w: 1 * 32,
				h: 3 * 32,
			},
			{
				x: 1 * 32,
				y: 23 * 32,
				w: 7 * 32,
				h: 1 * 32,
			}
		];
		this.checkpoints.forEach(v => {
			v.x -= tileOffset.x;
			v.y -= tileOffset.y;
		});
	}
	
	public findUntouchedPos(players: Player[], tiles: Tile[]) {
		for(let y = 0; y < 32*4; y += 32) {
			for(let x = 0; x < 32*8; x += 32) {
				if (!this.hitsSomething(x, y, players, tiles)) {
					this.pos.x = x;
					this.pos.y = y;
					return;
				}
			}
		}
	}
	
	public handleKeyChange(keys: KeyState) {
		this.keys = keys;
	}
	
	private lap() {
		NyoomRacer.lap(this.username).then(v => {
			this.socket.emit('lap', { name: this.username, laps: v });
		});
	}
	
	private handleCheckpoints() {
		let nextCheckpointI = this.lastCheckpoint + 1;
		if (nextCheckpointI >= this.checkpoints.length) {
			nextCheckpointI = 0;
		}
		let nextCheckpoint = this.checkpoints[nextCheckpointI];
		
		if (RectCircleColliding({
			x: this.pos.x, y: this.pos.y, r: this.crad,
		}, nextCheckpoint)) {
			this.lastCheckpoint = nextCheckpointI;
			if (this.lastCheckpoint === 0) {
				this.lap();
			}
		}
	}
	
	public update(dt: number, players: { [id: string]: Player }, tiles: Tile[]) {
		if (this.keys.up) {
			if (this.vel < 0) { this.vel += this.accel * dt; }
			this.vel += this.accel * dt;
		}
		else if (this.keys.down) {
			if (this.vel > 0) { this.vel -= this.accel * dt; }
			this.vel -= this.accel * dt;
		}
		else { this.vel = dampen(this.vel, this.accel * dt * 2) }
		
		if (this.keys.left) { 
			if (this.avel < 0) { this.avel += this.aaccel * dt; }
			this.avel += this.aaccel * dt;
		}
		else if (this.keys.right) { 
			if (this.avel > 0) { this.avel -= this.aaccel * dt; }
			this.avel -= this.aaccel * dt;
		}
		else { this.avel = dampen(this.avel, this.aaccel * dt * 2) }
		
		if (this.vel > this.maxvel) { this.vel = this.maxvel }
		if (this.vel < -this.maxvel) { this.vel = -this.maxvel }

		if (this.avel > this.maxavel) { this.avel = this.maxavel }
		if (this.avel < -this.maxavel) { this.avel = -this.maxavel }
		
		this.angle -= this.avel * dt;
		
		let xv = Math.cos(deg2rad(this.angle)) * this.vel;
		let yv = Math.sin(deg2rad(this.angle)) * this.vel;

		this.moveWithCollisions(
			xv * dt,
			yv * dt,
			Object.keys(players)
				.map(p => players[p])
				.filter(p => p.socket.id !== this.socket.id),
			tiles
		);
		
		this.handleCheckpoints();
	}
	
	private hitsSomething(x: number, y: number, players: Player[], tiles: Tile[]) {
		for(let player of players) {
			let px = player.pos.x;
			let py = player.pos.y;
			let prad = player.crad;
			
			let distX = px - x;
			let distY = py - y;
			let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
			
			if (dist < this.crad + prad) {
				return true;
			}
		}
		for (let tile of tiles) {
			if (RectCircleColliding({
				x, y, r: this.crad,
			}, {
				x: tile.x, y: tile.y, w: 32, h: 32
			})) {
				return true;
			}
		}
		
		return false;
	}
	
	private moveWithCollisions(xv: number, yv: number, players: Player[], tiles: Tile[]) {
		for(let t = 0; t < 1.0; t += 0.1) {
			let x = this.pos.x + xv * 0.1;
			let y = this.pos.y + yv * 0.1;
			
			let test = this.hitsSomething(x, y, players, tiles);
			if(test) {
				this.vel = 0;
				break;
			}
			
			this.pos.x = x;
			this.pos.y = y;
		}
	}
	
	public setUsername(name: string) {
		let trimmed = name.trim();
		if(trimmed.length === 0) {
			trimmed = 'unnamed';
		}
		this.username = trimmed;
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
			crad: this.crad,
		};
	}
};

function dampen(v: number, accel: number) {
	if (v > accel / 2) {
		v -= accel;
	} else if (v < -accel / 2) {
		v += accel;
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

// https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
function RectCircleColliding(
	circle: {x: number, y: number, r: number},
	rect: {x: number, y: number, w: number, h: number}) {
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
};