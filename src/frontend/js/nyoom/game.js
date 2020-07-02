import fetch from 'node-fetch';

function deg2rad(d) {
	return d * (Math.PI / 180);
};

function rad2deg(r) {
	return r * (180 / Math.PI);
};

function dampen(v, accel) {
	if (v > accel / 2) {
		v -= accel;
	} else if (v < -accel / 2) {
		v += accel;
	} else {
		v = 0;
	}
	return v;
};

const tileOffset = {
	x: 32*17,
	y: 32*2,
};

// https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
function RectCircleColliding(circle, rect) {
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

class World {
	constructor(p5) {
		this.p5 = p5;
		
		this.players = {};
		
		this.carImg = null;
		this.mapImg = null;
		
		this.tiles = [];
	}
	
	preload() {
		this.carImg = this.p5.loadImage('/assets/car.png');
		this.mapImg = this.p5.loadImage('/assets/nyoom_map_render.png');
		
		fetch('/assets/nyoom_map.json')
		.then(res => res.text())
		.then(text => JSON.parse(text))
		.then(map => {
			let { width, tilewidth, tileheight } = map;
			this.tiles = map.layers[0].data
				.map((t, i) => {
					let x = (i % width) * tilewidth;
					let y = Math.floor(i / width) * tileheight;
					
					x -= tileOffset.x;
					y -= tileOffset.y;
					
					return {x, y, t};
				})
				.filter(v => v.t == 1);
		})
		.catch(e => {
			alert('Error loading assets :(');
			window.location.reload();
		})
	}
	
	addPlayer(data) {
		let p = new Player(this.p5, this.carImg);
		p.id = data.id;
		this.players[data.id] = p;
		
		this.updatePlayer(p.id, data);
		
		return p;
	}
	
	updatePlayer(id, data) {
		let p = this.players[id || data.id];

		p.pos = data.pos;
		p.angle = data.angle;
		p.avel = data.avel;
		p.vel = data.vel;
		p.keys = data.keys;
		p.username = data.username;
		p.color = data.color;
		p.crad = data.crad;
	}
	
	update(dt) {
		Object.keys(this.players)
			.forEach(p => this.players[p].update(dt, this.players, this.tiles));
	}
	
	draw() {
		this.p5.image(this.mapImg, -tileOffset.x, -tileOffset.y, 32*35, 32*35);
		Object.keys(this.players).forEach(p => this.players[p].draw());
	}
};

class Player {
	constructor(p5, carImg) {
		this.p5 = p5;
		
		this.carImg = carImg;
		
		this.id = '';
		
		this.pos = { x: 0, y: 0 };
		this.angle = 0;
		this.avel = 0;
		this.vel = 0;
		
		this.accel = 200;
		this.aaccel = 250;
		this.maxvel = 300;
		this.maxavel = 200;
		
		this.color = 0xFFFFFF;
		
		this.crad = 16;
		
		this.username = 'unnamed';
		
		this.keys = {
			left: false,
			right: false,
			up: false,
			down: false,
		};
	}
	
	setKeys(keys) {
		this.keys = keys;
	}
	
	update(dt, players, tiles) {
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
				.filter(p => p.id !== this.id),
			tiles,
		);
	}
	
	moveWithCollisions(xv, yv, players, tiles) {
		// true or false
		const hitsSomething = (x, y) => {
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
		};
		
		for(let t = 0; t < 1.0; t += 0.1) {
			let x = this.pos.x + xv * 0.1;
			let y = this.pos.y + yv * 0.1;
			
			let test = hitsSomething(x, y);
			if(test) {
				this.vel = 0;
				break;
			}
			
			this.pos.x = x;
			this.pos.y = y;
		}
	}
	
	draw() {
		this.p5.push();

		this.p5.translate(this.pos.x, this.pos.y);
		
		let color = this.p5.color(`#${this.color.toString(16)}`);
		this.p5.tint(color);
		this.p5.rotate(deg2rad(this.angle + 90));
		this.p5.image(this.carImg, -16, -32);
		this.p5.circle(0, 0, this.crad * 2);
		this.p5.fill(0xFFFFFF);
		this.p5.textSize(18);
		this.p5.rotate(-deg2rad(this.angle + 90));
		this.p5.text(this.username, -16, -32);
		this.p5.fill(0x8abeb7);

		this.p5.pop();
	}
};

export default (container, $socket) => (p5) => {
	var $cnv;
	
	var world = new World(p5);
	
	var t = window.performance.now();
	
	const width = 700;
	const height = 700;
	
	let me = null;
	
	p5.preload = () => {
		world.preload();
	};
	
	p5.setup = () => {
		$cnv = p5.createCanvas(width, height);
		$cnv.parent(container)
		$cnv.position((p5.windowWidth - width) / 2, (p5.windowHeight - height) / 2);
		window.onresize = () => {
			$cnv.position((p5.windowWidth - width) / 2, (p5.windowHeight - height) / 2);
		};
		
		p5.frameRate(60);
		
		p5.rectMode(p5.CENTER);
	};
	
	p5.draw = () => {
		let dt = (window.performance.now() - t) / 1000;
		t = window.performance.now();
		
		p5.translate(350  -me.pos.x, 350 - me.pos.y);
		
		p5.background('#ccc');
		
		world.update(dt);
		world.draw();
	};
	
	p5.keyPressed = () => {
		if (!me) return;
		
		if (p5.key === 'w') {
			me.keys.up = true;
		} else if (p5.key === 's') {
			me.keys.down = true;
		} else if (p5.key === 'a') {
			me.keys.left = true;
		} else if (p5.key === 'd') {
			me.keys.right = true;
		}
		
		$socket.emit('keyStateChange', {keys: me.keys});
	};
	
	p5.keyReleased = () => {
		if (!me) return;

		if (p5.key === 'w') {
			me.keys.up = false;
		} else if (p5.key === 's') {
			me.keys.down = false;
		} else if (p5.key === 'a') {
			me.keys.left = false;
		} else if (p5.key === 'd') {
			me.keys.right = false;
		}

		$socket.emit('keyStateChange', {keys: me.keys});
	};
	
	$socket.on('worldupdate', ({players}) => {
		console.log('world update received');
		world.players = {};
		for (let player of players) {
			let p = world.addPlayer(player);
			if (player.id === $socket.id) {
				me = p;
			}
		}
	});
	
	$socket.on('playerleave', (id) => {
		console.log('player left');
		
		delete world.players[id];
	});
	
	$socket.on('update', (data) => {
		world.updatePlayer(data.id, data);
	});
};