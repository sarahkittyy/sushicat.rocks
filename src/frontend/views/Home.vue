<template>
<div>
	<header-divider>* sooshi cat *</header-divider>
	<p5-background />
</div>
</template>

<script>
import HeaderDivider from '@/frontend/components/HeaderDivider';
import P5Background from '@/frontend/components/P5Background';

export default {
	name: 'Home',
	data: function () {
		return {
			
		};
	},
	components: {
		HeaderDivider,
		P5Background
	}
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

</style>