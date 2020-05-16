<template>
<div v-if="running" class="enclosing">
	<img src="/assets/hand.png" id="hand" />
	<img src="/assets/kitty.png" id="kitty" />
</div> 
</template>

<script>
export default {
	name: 'PatAnim',
	data() {
		return {
			running: false,
		};
	},
	methods: {
		run() {
			if (this.running) return;
			
			this.running = true;
			setTimeout(() => {
				this.running = false;
			}, 300);
		}
	},
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

.enclosing {
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 75%;
	top: 0;
	left: 0;
	
	user-select: none;
	
	z-index: 99999997;
}

#hand {
	position: absolute;
	top: 10%;
	right: -4%;
	
	width: 150px;
	z-index: 99999999;
	
	animation: petter 300ms linear 0s 1 alternate;
}

#kitty {
	position: absolute;
	top: 15%;
	right: 0%;
	
	width: 100px;
	z-index: 99999998;
	
	animation: petee 300ms linear 0s 1 alternate;
}

@keyframes petter {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(-40deg);
	}
}

@keyframes petee {
}

</style>