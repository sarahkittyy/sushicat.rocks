import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from './views/Home';

const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', component: Home },
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;