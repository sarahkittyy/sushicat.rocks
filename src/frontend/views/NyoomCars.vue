<template>
<div id="phaser-root">
	<canvas ref="canvas" />
	<ion-phaser :game="game" :initialize="initialize" />
</div>
</template>

<script>
import io from 'socket.io-client';
import game from '../js/nyoom/game';

export default {
	name: 'NyoomCars',
	data: () => ({
		$socket: null,
		game: null,
		initialize: false,
	}),
	created() {
		document.title = 'nyoom cars o3o';
		
		this.$socket = io.connect('/nyoom');
	},
	mounted() {
		console.log(this.$refs.canvas.textContent);
		this.game = game(this.$refs.canvas, this.$socket);

		this.initialize = true;
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

#phaser-root {
	canvas {
		overflow: hidden;

		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		
		height: 90vh;
		width: 90%;
	}
}

</style>