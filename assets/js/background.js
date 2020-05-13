var cnv;
var cubes = [];
var totalcubes = 15;

class Cube {
	constructor() {
		let iw = window.innerWidth, ih = window.innerHeight;

		this.size = (Math.random() * 50) + 80;
		
		if (Math.random() > 0.5) {
			this.x = Math.random() * iw - (iw / 2);
			this.y = -(ih / 2) - this.size * 2;
		} else {
			this.x = -(iw / 2) - this.size * 2;
			this.y = Math.random() * ih - (ih / 2);
		}

		this.xvel = Math.random() * 3 + 1;
		this.yvel = Math.random() * 3 + 1;
		this.speed = Math.random() - 0.5;
		
		if (this.speed == 0) this.speed = 0.01;

		this.delete = false;
	}
	
	update() {
		this.x += this.xvel;
		this.y += this.yvel;

		let iw = window.innerWidth, ih = window.innerHeight;
		
		if (this.x > (iw / 2) + this.size * 2 || this.y > (ih / 2) + this.size * 2) {
			this.delete = true;
		}
	}
	
	draw() {
		push();

		translate(this.x, this.y, -100);
		fill('#4a669477');
		stroke(150,150,150,220);
		rotateX(millis() / 2000 * this.speed);
		rotateY(millis() / 2000 * this.speed);
		box(this.size);
		
		pop();
	}
};

function setup() {
	// create the canvas
	cnv = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	cnv.parent('canvas');
	
	cubes.push(new Cube());
	
	frameRate(30);
}

function draw() {
	// if the canvas is hidden, do not render
	if (document.querySelector('#canvas').hasAttribute('hidden')) return;
	
	// resize the canvas
	let { innerWidth, innerHeight } = window;
	resizeCanvas(innerWidth, innerHeight);

	// set background
	background(220);
	
	// update
	cubes = cubes.filter(c => !c.delete);
	while (cubes.length < totalcubes) {
		cubes.push(new Cube());
	}
	
	// draw
	pointLight(255, 255, 255, -innerWidth/2, -innerHeight/2, 0);
	for (let cube of cubes) {
		cube.update();
		cube.draw();
	}
}