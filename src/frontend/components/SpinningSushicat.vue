<template>
<div>
	<img src="/assets/sushicat.png" class="spin-forever" :style="style" />
</div>
</template>

<script>
export default {
	name: 'SpinningSushicat',
	props: {
		dir: String,
		maxheight: Number,
	},
	computed: {
		style() {
			return [
				`animation-direction: ${this.$props.dir === "left" ? "reverse" : "normal"};`,
				`height: ${this.$props.maxheight}px;`,
				`width: auto;`,
				`margin: 20px;`,
			].join('\n');
		},
	},
};
</script>

<style lang="scss" scoped>

@keyframes spin {
	from { 
		transform: rotate(0deg);
	}
	to {
		transform: rotate(359deg);
	}
}

.spin-forever {
	animation: spin 2s infinite linear;
}

</style>