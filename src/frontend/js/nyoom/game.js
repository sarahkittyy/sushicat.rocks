function deg2rad(d) {
	return d * (Math.PI / 180);
};

function rad2deg(r) {
	return r * (180 / Math.PI);
};

function dampen(v, max) {
	if (v > max / 2) {
		v -= max;
	} else if (v < -max / 2) {
		v += max;
	} else {
		v = 0;
	}
	return v;
};

class World {
	constructor(p5) {
		this.p5 = p5;
		
		this.players = {};
		
		this.carImg = null;
	}
	
	preload() {
		this.carImg = this.p5.loadImage('/assets/car.png');
	}
	
	addPlayer(data) {
		let p = new Player(this.p5, this.carImg);
		this.players[data.id] = p;
		
		p.id = data.id;
		p.pos = data.pos;
		p.angle = data.angle;
		p.avel = data.avel;
		p.vel = data.vel;
		p.keys = data.keys;
		p.username = data.username;
		p.color = data.color;
		
		return p;
	}
	
	update(dt) {
		Object.keys(this.players).forEach(p => this.players[p].update(dt));
	}
	
	draw() {
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
		
		this.accel = 0.003;
		this.aaccel = 0.003;
		this.maxvel = 0.15;
		this.maxavel = 0.15;
		
		this.color = 0xFFFFFF;
		
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
	
	update(dt) {
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
	
	draw() {
		this.p5.push();

		this.p5.translate(this.pos.x, this.pos.y);
		
		let color = this.p5.color(`#${this.color.toString(16)}`);
		this.p5.tint(color);
		this.p5.rotate(deg2rad(this.angle + 90));
		this.p5.image(this.carImg, -16, -32);
		this.p5.fill(0x000000);
		this.p5.rotate(-deg2rad(this.angle + 90));
		this.p5.text(this.username, -16, -32);

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
		let dt = t - window.performance.now();
		t = window.performance.now();
		
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
	
	$socket.on('playerjoin', (data) => {
		console.log('player joined');
		let p = world.addPlayer(data);
		if (data.id === $socket.id) {
			me = p;
		}
	});
	
	$socket.on('playerleave', (id) => {
		console.log('player left');
		
		delete world.players[id];
	});
	
	$socket.on('update', (data) => {
		let { id, pos, angle, avel, vel, keys, username, color } = data;
		
		let p = world.players[id];
		p.pos = pos;
		p.angle = angle;
		p.avel = avel;
		p.vel = vel;
		p.keys = keys;
		p.username = username;
		p.color = color;
	});
};