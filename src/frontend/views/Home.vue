<template>
<div>
	<header-divider height="150px">
		<div class="container">
			<span v-if="displaySushicats">
				<spinning-sushicat dir="left" id="left" :maxheight="sushicatHeight" />
				<spinning-sushicat dir="right" id="right" :maxheight="sushicatHeight" />
			</span>
			<div class="font-comic-sans" id="middle">
				<img src="/assets/logo.png" :style="`max-height: ${sushicatHeight + 30}px;`" class="logo" />
				<br />
				<toggle-switch v-model="backgroundVisible">animate background?</toggle-switch>
			</div>
		</div>
	</header-divider>

	<div class="content font-comic-sans">
		<content-container style="text-align: center;">
			<h1 class="rainbow-text">hewwo an welcome to my site</h1>
			<h4>nya~</h4>
			<twitter style="height: 780px; overflow: scroll;">
				<div slot="loading">loading...</div>
				<a class="twitter-timeline" href="https://twitter.com/DeepLeffen?ref_src=twsrc%5Etfw"></a>
			</twitter>
		</content-container>
		<pat-table />
	</div>
	
	<corner-nav>
		<template v-slot:small>
			nav &lt;3
		</template>
		<template v-slot:large>
			<app-list heading="navigation <3" text-only>
				<url-list-item to="/arf">arf! &lt;3</url-list-item>
				<url-list-item to="/arch">arch_linux.js</url-list-item>
			</app-list>
		</template>
	</corner-nav>
	
	<corner-links id="corner-toast">
		<img src="/assets/github.png" id="github-link" @click="toGithub" />	
	</corner-links>

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
import CornerLinks from '~/CornerLinks';
import CornerNav from '~/CornerNav';
import AppList from '~/AppList';
import UrlListItem from '~/UrlListItem';
import ContentContainer from '~/ContentContainer';
import { twitter } from 'vue-twitter';

import { debounce } from 'debounce';

export default {
	name: 'Home',
	data() {
		return {
			backgroundVisible: true,
			patName: '', 
			sushicatHeight: 90,
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
				this.sushicatHeight = 90;
			} else if (window.innerWidth >= 520) {
				this.sushicatHeight = 90 * (window.innerWidth / 720);
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
		CornerLinks,
		CornerNav,
		AppList,
		UrlListItem,
		ContentContainer,
		twitter
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

@use '~@/common';

.content {
	display: flex;
	
	flex-wrap: nowrap;
	justify-content: center;
	align-items: stretch;

	margin: 30px;

	width: calc(100% - 60px);

	@media (max-width: common.$small-width) {
		flex-direction: column;
		margin: 0px;
		margin-top: 10px;
		width: 100%;
	}
	
	* {
		flex: 1;
		margin: 30px;
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
		
		@media (max-width: common.$small-width) {
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