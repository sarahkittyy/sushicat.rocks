<template>
<div>

	<div v-if="!joined" class="username-input">
		<p>Username:</p>
		<text-input v-model="username" placeholder="username" @submit="load()" />
	</div>

	<div id="sketch" />
	<div class="leave-button">
		<simple-button v-if="joined" @click="$router.push('/home')">
			leave
		</simple-button>
	</div>
</div>
</template>

<script>
import io from 'socket.io-client';
import * as p5 from 'p5';
import game from '../js/nyoom/game';

import TextInput from '~/TextInput';
import SimpleButton from '~/SimpleButton';

export default {
	name: 'NyoomCars',
	data: () => ({
		$socket: null,
		game: null,
		username: null,
		joined: false,
	}),
	created() {
		document.title = 'nyoom cars o3o';
	},
	methods: {
		load() {
			this.$socket = io('/nyoom', {transports: ['websocket']});

			this.game = new p5(game('sketch', this.$socket));
			this.joined = true;
			
			this.$socket.emit('setusername', this.username);
		}
	},
	components: {
		TextInput,
		SimpleButton,
	},
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.username-input {
	@include common.font-comic-sans;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;

	width: 25%;
	height: 25%;
	
	text-align: center;
	
	border: 1px solid black;
	border-radius: 15px;
	background: common.$grey;
}

.leave-button {
	margin: 5px;
	
	* {
		width: 100px;
	}
}

</style>