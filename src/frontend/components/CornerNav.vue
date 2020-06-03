<template>
<div class="corner-toast font-comic-sans" @mouseover="hovering = true" @mouseleave="hovering = false">
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
		};
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.corner-toast {
	position: fixed;
	right: 0;
	bottom: 0;
	
	min-width: 20px;
	min-height: 20px;

	border-top: 2px solid black;
	border-left: 2px solid black;
	background-color: common.$grey;
	border-top-left-radius: 15px;
	
	padding: 10px;
	
	transform-origin: 100% 100%;
	transition: all 500ms;
	
	&:hover {
		width: 15%;
		height: 20%;
	}
}

</style>