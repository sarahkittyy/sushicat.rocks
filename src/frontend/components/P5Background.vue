<template>
<div id="canvas" class="full-viewport fixed-background">
</div>
</template>

<script>
export default {
	name: 'P5Background',
	props: {
		enabled: Boolean,
	},
	created() {
		if (this.$props.enabled) {
			this.$loadScript("/assets/js/p5.min.js")
			.then(() => {
				this.$loadScript("/assets/js/background.js");
			});
		}
	}
}
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

.full-viewport {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

.fixed-background {
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: -9999999999;
}

</style>