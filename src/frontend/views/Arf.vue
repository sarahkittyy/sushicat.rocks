<template>
<div id="arf-container">
	<img class="arf" id="arf-image" :src="dogImage" @click="bark">

	<div class="text-container" v-if="showText">
		<h1>unique arfs: {{ $store.getters.arfs }} </h1>
		<simple-button @click="$router.push('/home')">go home &lt;3</simple-button>
	</div>
	
	<vue-snotify />
</div> 
</template>

<script>

import SimpleButton from '../components/SimpleButton';

export default {
	name: 'Arf',
	data() {
		return {
			dogImage: '/assets/dog_inhale.jpg',	
			showText: false,
		};
	},
	methods: {
		bark() {
			if (this.showText == true) return;
			
			this.dogImage = '/assets/dog_arf.jpg';
			this.showText = true;
			
			this.$store.dispatch('postArf');
		},
	},
	components: {
		SimpleButton,
	},
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

#arf-container {
	width: 100%;
	height: 100vh;
	background-color: black;
	
	img {
		overflow: hidden;
	}
}

.arf {
	display: block;
	max-height: 80vh;
	max-width: 100%;
	margin: auto;
	
	cursor: pointer;
}

.text-container {
	width: 100%;
	height: 18vh;
	overflow: hidden;
	color: white;
	text-align: center;
}

</style>