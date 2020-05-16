<template>
<div>
	<header-divider height="125px">
		<div class="container">
			<spinning-sushicat dir="left" id="left" :maxheight="sushicatHeight" />
			<spinning-sushicat dir="right" id="right" :maxheight="sushicatHeight" />
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

export default {
	name: 'Home',
	data() {
		return {
			sushicatHeight: 75,
			backgroundVisible: true,
			patName: '', 
		};
	},
	methods: {
		setBackgroundVisibility(val) {
			this.backgroundVisible = val;
		},
	},
	components: {
		HeaderDivider,
		P5Background,
		SpinningSushicat,
		SimpleButton,
		PatTable,
	},
	mounted() {
		if (window.innerWidth < 480) {
			this.setBackgroundVisibility(false);
		}
	},
	created() {
		this.$store.dispatch('updatePatUsers');
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