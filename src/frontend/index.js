import Vue from 'vue';

import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';
import Snotify, { SnotifyPosition } from 'vue-snotify';

import 'vue-snotify/styles/simple.css';

import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(LoadScript);
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