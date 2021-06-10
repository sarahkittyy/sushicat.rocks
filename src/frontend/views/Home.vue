<template>
<div>
	<header-divider height="150px">
		<div class="container">
			<span v-if="displaySushicats">
				<spinning-sushicat dir="left" id="left" :maxheight="sushicatHeight" />
				<spinning-sushicat dir="right" id="right" :maxheight="sushicatHeight" />
			</span>
			<div id="middle">
				<img src="/assets/logo.png" :style="`max-height: ${sushicatHeight + 30}px;`" class="logo" />
				<br />
				<toggle-switch v-model="backgroundVisible">animate background?</toggle-switch>
			</div>
		</div>
	</header-divider>

	<div class="content">
		<content-container style="text-align: center;">
			<h1 class="rainbow-text">hewwo an welcome to my site</h1>
			<h4>nya~</h4>
			<twitter style="height: 780px; overflow: scroll;">
				<div slot="loading">loading...</div>
				<a class="twitter-timeline" href="https://twitter.com/DeepLeffen?ref_src=twsrc%5Etfw"></a>
			</twitter>
		</content-container>
    <vue-recaptcha
      ref="recaptcha"
      :sitekey="recaptchaKey"
      badge="bottomleft"
      style="display: none;"
      size="invisible"
      @verify="onVerify"
    ></vue-recaptcha>
		<content-container class="notif-center">
			<h1 class="rainbow-text">broadcast a notif!! &gt;w&lt;</h1>
			<text-input v-model="notifInputName" placeholder="name" />
			<text-input v-model="notifInputMessage" placeholder="message" @submit="trySendNotif" />
			<simple-button @click="trySendNotif" style="margin-top: 0px;">
        send &gt;w&lt;
      </simple-button>
			<h4 v-if="online == null">loading...</h4>
			<h4 v-else>{{ online }} people on this site</h4> 
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
				<url-list-item to="/nyoom">NYOOM CARS</url-list-item>
				<url-list-item to="/arch">arch_linux.js</url-list-item>
				<url-list-item to="/e">e</url-list-item>
				<url-list-item to="/why/are/you/here">[under construction do not click]</url-list-item>
				<url-list-item to="/admin">admin panel</url-list-item>
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
import TextInput from '~/TextInput';
import AppList from '~/AppList';
import UrlListItem from '~/UrlListItem';
import ContentContainer from '~/ContentContainer';
import VueRecaptcha from 'vue-recaptcha';
import { twitter } from 'vue-twitter';

import io from 'socket.io-client';

import { debounce } from 'debounce';

export default {
	name: 'Home',
	data() {
		return {
			backgroundVisible: true,
			patName: '', 
			sushicatHeight: 90,
			displaySushicats: true,
			notifInputName: '',
			notifInputMessage: '',
			socket: null,
			online: null,
		};
	},
	methods: {
    onVerify(response) {
      this.sendNotif(response);
    },
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
    trySendNotif() {
      this.$refs.recaptcha.execute();
    },
		sendNotif(response) {
			this.socket.emit('notify', { 
				message: this.notifInputMessage,
				name: this.notifInputName,
        response,
			});
      this.$refs.recaptcha.reset();
		},
	},
  computed: {
    recaptchaKey() {
      return process.env.VUE_APP_RECAPTCHA_SITE_KEY;
    },
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
		TextInput,
		twitter,
    VueRecaptcha,
	},
	created() {
		document.title = '* sooshi cat *';
		
		this.$store.dispatch('fetchPatUsers');
		window.addEventListener('resize', this.computeSushicatHeight);
		this.computeSushicatHeight();
		
		this.socket = io('/home', {
			transports: ['websocket'],
			rejectUnauthorized: process.env.NODE_ENV === 'production',
		});
		
		this.socket.on('notify', ({ message, name }) => {
			this.$snotify.info(message, `notif from ${name}`);
		});
		
		this.socket.on('err', ({ error, message}) => {
			this.$snotify.error(message, error);
		});
		
		this.socket.on('peopleCount', ({ people }) => {
			this.online = people;
		});
	},
	beforeDestroy() {
		this.socket.close();
	},
	destroyed() {
		window.removeEventListener('resize', this.computeSushicatHeight);
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.content {
	@include common.font-comic-sans;
	
	display: flex;
	
	flex-wrap: wrap;
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

.notif-center {
	text-align: center;
	*:not(:first-child) {
		margin-top: 3px;
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
		@include common.font-comic-sans;
		
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