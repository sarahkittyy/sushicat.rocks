<template>
<div>
	<header-divider height="125px">
		<div class="container">
			<span v-if="displaySushicats">
				<spinning-sushicat dir="left" id="left" :maxheight="sushicatHeight" />
				<spinning-sushicat dir="right" id="right" :maxheight="sushicatHeight" />
			</span>
			<div class="font-comic-sans" id="middle">
				<h1>* sooshi cat *</h1>
				<span>animate background?</span>
				<b-form-checkbox v-model="backgroundVisible" switch />
			</div>
		</div>
	</header-divider>
	
	<pat-table />
	
	<p5-background :enabled="backgroundVisible" />
	<vue-snotify />
</div>
</template>

<script>
import HeaderDivider from '../components/HeaderDivider';
import P5Background from '../components/P5Background';
import SpinningSushicat from '../components/SpinningSushicat';
import SimpleButton from '../components/SimpleButton';
import PatTable from '../components/PatTable';

import { debounce } from 'debounce';

export default {
	name: 'Home',
	data() {
		return {
			backgroundVisible: true,
			patName: '', 
			sushicatHeight: 75,
			displaySushicats: true,
		};
	},
	methods: {
		setBackgroundVisibility(val) {
			this.backgroundVisible = val;
		},
		computeSushicatHeight: debounce(function () {
			this.displaySushicats = true;
			if (window.innerWidth >= 720) {
				this.sushicatHeight = 75;
			} else if (window.innerWidth >= 520) {
				this.sushicatHeight = 75 * (window.innerWidth / 720);
			} else {
				this.displaySushicats = false;
			}
		}, 500),
	},
	components: {
		HeaderDivider,
		P5Background,
		SpinningSushicat,
		SimpleButton,
		PatTable,
	},
	created() {
		this.$store.dispatch('updatePatUsers');
		window.addEventListener('resize', this.computeSushicatHeight);
		this.computeSushicatHeight();
	},
	destroyed() {
		window.removeEventListener('resize', this.computeSushicatHeight);
	}
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

.container {
	position: relative;
	width: 100%;
	
	text-align: center;
	justify-content: center;
	
	#left {
		position: absolute;
		width: 200px;	
		left: 3px;
	}
	
	#middle {
		margin: 0 auto;
		width: 500px;
		
		@media (max-width: 520px) {
			width: auto;
		}
	}
	
	#right {
		position: absolute;
		width: 200px;
		right: 3px;
	}
}

</style>