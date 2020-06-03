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
				<toggle-switch v-model="backgroundVisible" />
			</div>
		</div>
	</header-divider>
	

	<div class="content">
		<pat-table />
		<app-list head="navigate <3">
			<list-item> </list-item>
		</app-list>
	</div>
	
	<corner-info id="corner-toast">
		<img src="/assets/github.png" id="github-link" @click="toGithub" />	
	</corner-info>

	<p5-background :enabled="backgroundVisible" />
	<vue-snotify />
</div>
</template>

<script>
import HeaderDivider from '~/HeaderDivider';
import P5Background from '~/P5Background';
import SpinningSushicat from '~/SpinningSushicat';
import SimpleButton from '~/SimpleButton';
import PatTable from '~/PatTable';
import ToggleSwitch from '~/ToggleSwitch';
import CornerInfo from '~/CornerInfo';
import AppList from '~/AppList';
import ListItem from '~/AppList';

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
		toGithub() {
			window.location = 'https://github.com/sarahkittyy/sushicat.rocks';	
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
		ToggleSwitch,
		CornerInfo,
		AppList
	},
	created() {
		this.$store.dispatch('fetchPatUsers');
		window.addEventListener('resize', this.computeSushicatHeight);
		this.computeSushicatHeight();
	},
	destroyed() {
		window.removeEventListener('resize', this.computeSushicatHeight);
	}
};
</script>

<style lang="scss" scoped>

@import '~@/common';

.content {
	display: flex;
	
	flex-wrap: nowrap;
	justify-content: center;
	align-items: stretch;
	
	@media (max-width: 520px) {
		flex-direction: column;
	}
	
	width: 100%;
	
	* {
		flex: 1;
	}
}

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

#corner-toast {
	#github-link {
		max-width: 32px;
		
		&:hover {
			max-width: 38px;
		}
		
		&:active {
			max-width: 36px;
		}
	}
}

</style>