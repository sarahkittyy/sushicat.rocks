import Vue from 'vue';
import Vuex from 'vuex';

import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';

import store from './store';
import router from './router';

import Home from './views/Home';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(LoadScript);

const app = new Vue({
	el: '#root',
	store,
	router,
	template: '<router-view></router-view>',
});