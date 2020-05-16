<template>
<div>
	<header-divider height="125px">
		<div class="container">
			<spinning-sushicat dir="left" id="left" :maxheight="sushicatHeight" />
			<spinning-sushicat dir="right" id="right" :maxheight="sushicatHeight" />
			<div class="font-comic-sans" id="middle">
				<h1>* sooshi cat *</h1>
				<span>background?</span>
				<b-form-checkbox v-model="backgroundVisible" switch />
			</div>
		</div>
	</header-divider>
	
	<div id="pat-box" class="font-comic-sans">
		<table>
			<tr>
				<th>name</th>
				<th>pats</th>
			</tr>
			<tr v-for="item in this.$store.getters.pats" :key="item.name">
				<td>{{ item.name }}</td>
				<td>{{ item.pats }}</td>
			</tr>
		</table>
	</div>
	
	<p5-background :enabled="backgroundVisible" />
	<vue-snotify />
</div>
</template>

<script>
import HeaderDivider from '../components/HeaderDivider';
import P5Background from '../components/P5Background';
import SpinningSushicat from '../components/SpinningSushicat';

export default {
	name: 'Home',
	data() {
		return {
			sushicatHeight: 75,
			backgroundVisible: true,
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

#pat-box {
	margin: 30px;
	border: 1px solid black;
	border-radius: 15px;
	width: 25%;
	overflow: auto;


	table {
		border-collapse: collapse;
		width: 100%;
		border-style: hidden;
		border-spacing: 0;
		
		background: #aaa;
		
		* {
			padding: 10px;
			padding-top: 5px;
			padding-bottom: 5px;
		}
		
		th {
			font-weight: 900;
			font-size: 14pt;
		}
		
		td, th {
			border: 1px solid black;
		}
	}
}

</style>