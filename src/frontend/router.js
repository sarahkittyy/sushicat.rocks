import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from './views/Home';
import NotFound from './views/NotFound';

const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', component: Home },
	{ path: '*', component: NotFound },
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;