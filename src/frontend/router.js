import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from './views/Home';
import NotFound from './views/NotFound';
import Arf from './views/Arf';
import ArchLinux from './views/ArchLinux';
import E from './views/E';
import WhyAreYouHere from './views/WhyAreYouHere';
import Admin from './views/Admin';
import NyoomCars from './views/NyoomCars';

const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/discord', beforeEnter(to, from, next) {
		window.location.href = "https://discord.gg/ewWPufHxWK";
	}},
	{ path: '/home', component: Home },
	{ path: '/arf', component: Arf },
	{ path: '/arch', component: ArchLinux },
	{ path: '/e', component: E },
	{ path: '/why/are/you/here', component: WhyAreYouHere },
	{ path: '/admin', component: Admin },
	{ path: '/nyoom', component: NyoomCars },
	{ path: '*', component: NotFound },
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;