import Vue from 'vue';
import Vuex from 'vuex';

import fetch from 'node-fetch';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		patUsers: [],
	},
	mutations: {
		setPatUsers(state, users) {
			state.patUsers = users;
		}
	},
	actions: {
		updatePatUsers({ commit }) {
			fetch('/api/pat')
			.catch((err) => {
				Vue.$snotify.error(err, 'couldn\'t get the fwiggin,, pats');
			})
			.then(res => res.json())
			.then(json => {
				let users = []
				for (let user of json) {
					users.push({ name: user.name, pats: user.pats });
				}
				commit('setPatUsers', users);
			});
		}
	},
	getters: {
		pats(state) {
			return state.patUsers;	
		}
	},
});

export default store;