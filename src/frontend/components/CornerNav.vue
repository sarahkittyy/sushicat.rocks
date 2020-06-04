<template>
<div class="corner-toast font-comic-sans" @mouseenter="mouseenter" @mouseleave="mouseleave">
	<slot name="small" v-if="!hovering" />
	<slot name="large" v-else />
</div>
</template>

<script>
export default {
	name: 'CornerNav',
	data() {
		return {
			hovering: false,	
			timeout: null
		};
	},
	methods: {
		mouseenter() {
			console.log('over');
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.hovering = true;
			}, 200);
		},
		mouseleave() {
			this.hovering = false;
		}
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.corner-toast {
	position: fixed;
	right: 0;
	bottom: 0;
	
	width: 50px;
	height: 30px;
	
	border-top: 2px solid black;
	border-left: 2px solid black;
	background-color: common.$grey;
	border-top-left-radius: 15px;
	
	padding: 10px;
	
	transform-origin: 100% 100%;
	transition: all 200ms ease-out;
	
	&:hover {
		width: 15%;
		height: 20%;
	}
}

</style>