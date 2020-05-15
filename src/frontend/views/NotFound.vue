<template>
<div class="center font-comic-sans">
	<h1>page nyot found ;w;</h1>
	<simple-button @click="back">go bacc &lt;3</simple-button>
	<br />
	<img src="/assets/penguindance.gif" class="penguindance" />
</div>
</template>

<script>
import SimpleButton from '../components/SimpleButton';

export default {
	name: 'NotFound',
	methods: {
		back() {
			this.$router.go(-1);
		}
	},
	components: {
		SimpleButton,
	},
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

.center {
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