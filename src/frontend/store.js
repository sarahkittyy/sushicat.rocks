import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		backgroundVisible: true,
	},
	mutations: {
		setBackgroundVisibility(state, value) {
			state.backgroundVisible = value;
		},
	},
	getters: {
		backgroundVisible: state => state.backgroundVisible,
	},
});

export default store;