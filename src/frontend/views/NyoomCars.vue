<template>
<div id="phaser-root">
	<canvas ref="canvas" />
</div>
</template>

<script>
import io from 'socket.io-client';
import * as p5 from 'p5';

export default {
	name: 'NyoomCars',
	data: () => ({
		$socket: null,
	}),
	created() {
		document.title = 'nyoom cars o3o';
		
		this.$socket = io.connect('/nyoom');
	},
	mounted() {
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