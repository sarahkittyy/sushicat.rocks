<template>
<div>
	<header-divider>
		<grid-container :rows=1 :cols=3>
		
		</grid-container>
	</header-divider>
	<p5-background :enabled="backgroundVisible" />
</div>
</template>

<script>
import HeaderDivider from '../components/HeaderDivider';
import P5Background from '../components/P5Background';
import GridContainer from '../components/GridContainer';
import GridItem from '../components/GridItem';

import { mapGetters, mapMutations } from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
		};
	},
	computed: {
		...mapGetters([
			'backgroundVisible'
		]),
	},
	methods: {
		...mapMutations([
			'setBackgroundVisible',
		]),
	},
	components: {
		HeaderDivider,
		P5Background,
		GridContainer,
	},
	created() {
		if (window.innerWidth < 480) {
			this.setBackgroundVisibility(false);
		}
	}
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

</style>