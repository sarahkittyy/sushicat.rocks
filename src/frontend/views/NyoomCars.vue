<template>
<div>
	<div id="sketch" />
</div>
</template>

<script>
import io from 'socket.io-client';
import * as p5 from 'p5';
import game from '../js/nyoom/game';

export default {
	name: 'NyoomCars',
	data: () => ({
		$socket: null,
		game: null,
	}),
	created() {
		document.title = 'nyoom cars o3o';
		
		this.$socket = io.connect('/nyoom');
	},
	mounted() {
		this.game = new p5(game('sketch', this.$socket));
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

#phaser-root {
	#sketch {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
}

</style>