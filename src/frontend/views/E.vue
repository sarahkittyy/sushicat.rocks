<template>
<div class="e-image">
	<img src="/assets/e.png" />
	<br />
	<simple-button @click="$router.push('/home');">go home &lt;3</simple-button>
</div>
</template>

<script>
import SimpleButton from '~/SimpleButton';

export default {
	name: 'E',
	components: {
		SimpleButton,
	},
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.e-image {
	background-color: common.$grey;
	
	width: 100%;
	height: 100vh;
	overflow: hidden;
	text-align: center;
	
	img { 
		
		max-width: 100%;
		max-height: 100%;
		overflow: hidden;
		padding: 0;
		margin: 0;
	}
}

</style>