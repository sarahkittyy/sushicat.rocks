import Vue from 'vue';
import Vuex from 'vuex';

import VueRouter from 'vue-router';

import store from './store';
import router from './router';

import Home from './views/Home';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const app = new Vue({
	el: '#root',
	store,
	router,
	template: '<router-view></router-view>',
});