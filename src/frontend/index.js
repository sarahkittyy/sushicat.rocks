import Vue from 'vue';

import VueRouter from 'vue-router';
import Snotify, { SnotifyPosition } from 'vue-snotify';

import { defineCustomElements as ion } from '@ion-phaser/core/loader';

import 'vue-snotify/styles/simple.css';

import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];

ion(window);

Vue.use(VueRouter);
Vue.use(Snotify, {
	toast: {
		position: SnotifyPosition.rightBottom,
		timeout: 1500,
		titleMaxLength: 20,
	},
});

const vm = new Vue({
	el: '#root',
	store,
	router,
	template: '<router-view />',
	beforeCreate() {
		Vue.$snotify = this.$snotify;
	}
});

// todo - remove this in prod :)
window.vm = vm;