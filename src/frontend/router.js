import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from './views/Home';
import NotFound from './views/NotFound';
import Arf from './views/Arf';
import ArchLinux from './views/ArchLinux';

const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', component: Home },
	{ path: '/arf', component: Arf },
	{ path: '/arch', component: ArchLinux },
	{ path: '*', component: NotFound },
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;