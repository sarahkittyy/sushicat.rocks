<template>
<div class="corner-toast" @mouseenter="mouseenter" @mouseleave="mouseleave">
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
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.hovering = true;
			}, 200);
		},
		mouseleave() {
			clearTimeout(this.timeout);
			this.hovering = false;
		}
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.corner-toast {
	@include common.font-comic-sans;
	
	position: fixed;
	right: 0;
	bottom: 0;
	
	min-width: 50px;
	min-height: 30px;
	
	border-top: 2px solid black;
	border-left: 2px solid black;
	background-color: common.$grey;
	border-top-left-radius: 15px;
	
	padding: 10px;
	
	transform-origin: 100% 100%;
	transition: all 200ms ease-out;
	
	&:hover {
		min-width: 15%;
		min-height: 20%;
		
		min-width: 200px;
	}
}

</style>