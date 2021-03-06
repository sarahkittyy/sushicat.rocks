import Vue from 'vue';

import Snotify, { SnotifyPosition } from 'vue-snotify';
import VueRecaptcha from 'vue-recaptcha';
import VueRouter from 'vue-router';

import 'vue-snotify/styles/simple.css';

import store from './store';
import router from './router';

Vue.config.productionTip = false;

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