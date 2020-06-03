<template>
<div id="canvas" class="full-viewport fixed-background" :hide="!enabled">
</div>
</template>

<script>
import p5 from 'p5';

export default {
	name: 'P5Background',
	data() {
		return {
			p5script: undefined,
			canvas: undefined,
		};
	},
	props: {
		enabled: Boolean,
	},
	mounted() {
		const script = function (p5) {
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
					p5.push();

					p5.translate(this.x, this.y, -100);
					p5.fill('#4a669477');
					p5.stroke(150,150,150,220);
					p5.rotateX(p5.frameCount / (2*30) * this.speed);
					p5.rotateY(p5.frameCount / (2*30) * this.speed);
					p5.box(this.size);
					
					p5.pop();
				}
			};

			p5.setup = function () {
				// create the canvas
				cnv = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
				cnv.parent('canvas');
				
				cubes.push(new Cube());
				
				p5.frameRate(30);
			}

			p5.draw = function () {
				// if the canvas is hidden, do not render
				if (document.querySelector('#canvas').hasAttribute('hide')) {
					p5.background(220);
					return;
				}
				
				// resize the canvas
				let { innerWidth, innerHeight } = window;
				p5.resizeCanvas(innerWidth, innerHeight);

				// set background
				p5.background(220);
				
				// update
				cubes = cubes.filter(c => !c.delete);
				while (cubes.length < totalcubes) {
					cubes.push(new Cube());
				}
				
				// draw
				p5.pointLight(255, 255, 255, -innerWidth/2, -innerHeight/2, 0);
				for (let cube of cubes) {
					cube.update();
					cube.draw();
				}
			}
		}
		this.p5script = new p5(script);
		this.canvas = this.$el.querySelector('#canvas');
	},
}
</script>

<style lang="scss" scoped>

@use '~@/common';

.full-viewport {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

.fixed-background {
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: -9999999999;
}

</style>