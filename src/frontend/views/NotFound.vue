<template>
<div class="center">
	<h1>page nyot found ;w;</h1>
	<simple-button @click="back">go {{ redirectLocation }} &lt;3</simple-button>
	<br />
	<img src="/assets/penguindance.gif" class="penguindance" />
</div>
</template>

<script>
import SimpleButton from '~/SimpleButton';

export default {
	name: 'NotFound',
	methods: {
		back() {
			if (this.hasBack) {
				this.$router.go(-1);	
			} else {
				this.$router.go('/home');
			}
		}
	},
	computed: {
		hasBack() {
			return window.history.length != 0;
		},
		redirectLocation() {
			return this.hasBack ? 'back' : 'home'; 
		},
	},
	components: {
		SimpleButton,
	},
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.center {
	@include common.font-comic-sans;
	
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
}

.penguindance {
	width: 100px;
}

</style>