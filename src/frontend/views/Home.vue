<template>
<div>
	<header-divider height="125px">
		<div class="container">
			<spinning-sushicat dir="left" id="left" :maxheight="sushicatHeight" />
			<spinning-sushicat dir="right" id="right" :maxheight="sushicatHeight" />
			<div class="font-comic-sans" id="middle">
				<h1>* sooshi cat *</h1>
			</div>
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

.container {
	width: 100%;
	
	text-align: center;
	justify-content: center;
	
	#left {
		float: left;
		width: 200px;	
	}
	
	#middle {
		margin: 0 auto;
		width: 500px
	}
	
	#right {
		float: right;
		width: 200px;
	}
}

</style>