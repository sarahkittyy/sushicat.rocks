<template>
<div>

	<div v-if="!joined" class="username-input">
		<p>username:</p>
		<text-input
			v-model="username"
			:error="!!error"
			placeholder="username"
			@submit="load()"
		/>
		<simple-button id="submit-button" @click="load()">
			enter
		</simple-button>
		<p v-if="error">error: {{ error }}</p>
	</div>

	<div id="sketch" />
	<div class="leave-button">
		<simple-button v-if="joined" @click="$router.push('/home')">
			leave
		</simple-button>
	</div>
	<div class="lap-table" v-if="joined">
		<nyoom-table />
	</div>
</div>
</template>

<script>
import io from 'socket.io-client';
import * as p5 from 'p5';
import game from '../js/nyoom/game';

import TextInput from '~/TextInput';
import SimpleButton from '~/SimpleButton';
import NyoomTable from '~/NyoomTable';

export default {
	name: 'NyoomCars',
	data: () => ({
		$socket: null,
		game: null,
		username: '',
		joined: false,
		error: null,
	}),
	created() {
		document.title = 'nyoom cars o3o';
	},
	methods: {
		load() {
			let trimmed = this.username.trim();
			if (trimmed.length === 0) {
				this.error = 'must include some characters';
				return;
			}
			if (trimmed.length > 20) {
				this.error = "must be <= 20 chars long";
			}
			
			this.$socket = io('/nyoom', {transports: ['websocket']});

			this.game = new p5(game('sketch', this.$socket));
			this.joined = true;
			
			this.$socket.emit('setusername', this.username);
			
			this.$socket.on('lap', ({ name, laps }) => {
				this.$store.commit('setNyoomRacer', { name, laps });
			});
		}
	},
	components: {
		TextInput,
		SimpleButton,
		NyoomTable,
	},
	watch: {
		username(_) {
			this.error = null;
		}
	}
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
	
	#submit-button {
		margin-top: 10px;
	}
}

.leave-button {
	margin: 5px;
	
	* {
		width: 100px;
	}
}

.lap-table {
	position: absolute;
	top: 0;
	right: 0;
	margin: 5px;
}

</style>