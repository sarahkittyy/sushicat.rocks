<template>
<div style="width: 100%; height: 100vh; overflow: hidden;" class="font-comic-sans">
	<div class="site" v-if="entered">
		<audio ref="bgAudio" @canplay="decreaseVolume" src="/assets/009.mp3" autoplay></audio>
		<div id="heading" :style="`flex-direction: ${headingFlexDir};`">
			<img src="/assets/gendernotvibing.png" class="spinny" style="max-height: 200px;" />
			<h1 class="rainbow-text">{{ heading }}</h1>
		</div>
		<div class="content">
			<p>
				this website says<br />
					<b>TRANS RIGHTS &gt;:(</b><br />
				so grr go away transphobes<br />
			</p>
			<simple-button @click="tryLeave">leave uwu</simple-button>
			<simple-button
				class="jumpbtn"
				:style="jumpBtnStyle"
				@mouseover="randomizeStopButton"
			>
				STOP MUSIC ;A;
			</simple-button>
		</div>
		<vue-snotify />
	</div>

	<div class="warning" v-else>
		<p>
			BE CAREFUL<br />
			MANY FLASHY COLORS<br />
			ALSO LOTS OF NOISE<br />
			ARE U SURE?!??<br />
		</p>
		<simple-button @click="init">!! go forthward !!</simple-button>
		<br />
		<simple-button @click="$router.push('/home');">stay safe n leave</simple-button>
	</div> 
</div> 
</template>

<script>
import SimpleButton from '~/SimpleButton';

export default {
	name: 'WhyAreYouHere',
	data: () => ({
		intervals: [],
		entered: false,
		heading: "WebBy SiTE o3O",
		headingFlexDir: 'row',
		leaveCount: 0,
		stopMusicX: 0,
		stopMusicY: 0
	}),
	methods: {
		decreaseVolume() {
			console.log('nya');
			this.$refs.bgAudio.volume = 0.2;
		},
		init() {
			this.entered = true;
			
			let titles = [
				'aaaaaaaaaaaaa',
				'ur valid',
				'SONsHIE CATE',
				'lsdkjfklsdjflskdjlaskjdldskjfsldkf',
				'^w^',
				'do u ever just',
				'awah',
				'beep beep lettuce',
				'check out soup.rocks',
				'check out spaghetti.rocks',
				'nyah >w<'
			];
			this.intervals.push(setInterval(() => {
				this.computeHeading();
			}, 500));
			this.intervals.push(setInterval(() => {
				document.title = titles[Math.floor(Math.random() * titles.length)];
				this.notify();
				this.flipHeading();
			}, 2000));
			
			this.randomizeStopButton();
		},
		randomizeStopButton() {
			this.stopMusicX = Math.random() * 95;
			this.stopMusicY = Math.random() * 95;
		},
		tryLeave() {
			this.leaveCount++;
			if(this.leaveCount < 10) {
				this.$snotify.error('GRR NO LEAVING >:(((');
			} else {
				this.$snotify.clear();
				this.$router.push('/home');
			}
		},
		flipHeading() {
			this.headingFlexDir = (Math.random() > 0.5 ? 'row' : 'row-reverse');
		},
		computeHeading() {
			let str = this.heading;
			this.heading = str.split('')
				.map(c => {
					if (Math.random() > 0.5) {
						return c.toUpperCase();
					} else {
						return c.toLowerCase();
					}
				})
				.join('');
		},
		notify() {
			let msgs = [
				'eep',
				'gosjdkfjsdf',
				'they DO be VIBIN doe',
				'meowmeowmeowme',
				'ok so baiscaly la imbabey',
				'trans rights',
				'trans rights',
				'trans rights',
				'ur cute sjdlfsdf',
				'ur so fwiggin adorable',
				'yes homo bro owo'
			];
			this.$snotify.info(msgs[Math.floor(Math.random() * msgs.length)], {
				
			});
		}
	},
	computed: {
		jumpBtnStyle() {
			return `top: ${this.stopMusicX}%; left: ${this.stopMusicY}%;`;
		}
	},
	created() {
		document.title = 'oh nyo';
	},
	destroyed() {
		this.intervals.forEach(i => clearInterval(i));
	},
	components: {
		SimpleButton
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(359deg);
	}
}

.jumpbtn {
	position: absolute;
	z-index: 99;
	top: 10%;
	right: 10%;
}

.rainbow-text {
	@include common.rainbow-text;
}

.spinny {
	animation: spin 3s ease infinite;
}

.content {
	width: 100%;
	text-align: center;
	
	p {
		font-size: 18pt;
		background-image: linear-gradient(#33BBFF, #FFFFFF, #F7A8B8);
		background-clip: text;
		color: transparent;
		
		margin-top: 150px;
	}
}

.site {
	background: url('/assets/penguinmarch.gif') top left repeat, 
							linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3) left top no-repeat;
	background-size: 25%, 100%;
	
	@media (max-width: common.$small-width) {
		background-size: 100%, 100%;
	}
	
	width: 100%;
	height: 100%;
	
	padding: 0;
	margin: 0;
	
	overflow: hidden;
	
	#heading {
		display: flex;
		width: 100%;
		
		justify-content: center;
		align-items: center;
		
		margin-top: 30px;
	}
}

.warning {
	background-color: common.$light-grey;
	
	width: 100%;
	height: 100vh;
	overflow: hidden;
	
	display: flexbox;
	justify-content: center;
	align-items: center;
	text-align: center;
	
	* {
		margin: 10px;
	}
	
	p {
		font-size: 30pt;
	}
	
	
}

</style>