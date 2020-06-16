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

@import '~@/common';

.e-image {
	width: 100%;
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