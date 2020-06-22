import Phaser from 'phaser';

class Car {
	constructor(x, y, scene) {
		this.x = x;
		this.y = y;
		this.scene = scene;
		
		let color = Math.floor(Math.random() * 0xFFFFFF);

		this.wheels = [
			scene.add.rectangle(this.x - 16, this.y - 32, 10, 15, 0xFFFFFF, 1.0),
			scene.add.rectangle(this.x + 16, this.y - 32, 10, 15, 0xFFFFFF, 1.0),
			scene.add.rectangle(this.x + 16, this.y + 32, 10, 15, 0xFFFFFF, 1.0),
			scene.add.rectangle(this.x - 16, this.y + 32, 10, 15, 0xFFFFFF, 1.0)
		];
		this.body = scene.add.rectangle(this.x, this.y, 32, 64, color, 1.0);
	}
	
	remove() {
		this.body.destroy();
		this.wheels.forEach(w => w.destroy());
	}
	
	update() {
		this.body.setPosition(this.x, this.y);
	}
}

export default ($cnv, $socket) => {
	let scene = new Phaser.Scene('Game');
	
	scene.init = function () {
		this.cameras.main.setBackgroundColor('#cccccc');
		this.cameras.main.centerOn(0, 0);
		
		this.physics = new Phaser.Physics.Arcade.ArcadePhysics(this);
		this.physics.world = new Phaser.Physics.Arcade.World(this);

		this.physics.world.setFPS(60);
	};
	scene.preload = function () {
	};
	scene.create = function () {
		this.graphics = new Phaser.GameObjects.Graphics(this);
		
		this.cars = [];
		this.yourCar = new Car(0, 0, this);
	};
	scene.update = function () {
		this.cars = this.cars.map(c => c.update());
		this.yourCar.update();
	};
	
	let game = new Phaser.Game({
		width: "100%",
		height: "100vh",
		type: Phaser.WEBGL,
		canvas: $cnv,
		scene,
		fps: {
			target: 60,
		},
	});
	
	return game;
};