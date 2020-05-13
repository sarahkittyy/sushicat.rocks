<template>
<div>
	<header-divider height="125px">
		<div id="header-grid" class="full-height">
			<spinning-sushicat dir="left" :maxheight="sushicatHeight" />
			<div class="font-comic-sans">
				<h1>* sooshi cat *</h1>
			</div>
			<spinning-sushicat dir="right" :maxheight="sushicatHeight" />
		</div>
	</header-divider>
	<p5-background :enabled="backgroundVisible" />
</div>
</template>

<script>
import HeaderDivider from '../components/HeaderDivider';
import P5Background from '../components/P5Background';
import SpinningSushicat from '../components/SpinningSushicat';

import { mapGetters, mapMutations } from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
			sushicatHeight: 75,
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
		SpinningSushicat,
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

#header-grid {
	display: flex;

	width: 100%;
	height: 100%;

	align-items: center;
	justify-content: center;

	column-count: 3;
	column-rule: none;
	
	text-align: center;
	overflow: visible;
	
	* {
		height: 100%;
	}
}

</style>