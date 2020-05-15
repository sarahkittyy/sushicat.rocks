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
		},
		updatePatUser(state, name, newpats) {
			let i = state.patUsers.findIndex(e => e.name === name);
			if (i != -1) {
				state.patUsers[i] = { name, pats: newpats };
			}
		},
	},
	actions: {
		updatePatUsers({ commit }) {
			fetch('/api/pat')
			.catch((err) => {
				Vue.$snotify.error(err, 'error gettin pats');
			})
			.then(res => res.json())
			.then(json => {
				let users = [];
				for (let user of json) {
					users.push({ name: user.name, pats: user.pats });
				}
				commit('setPatUsers', users);
			});
		},
		patAndUpdate({ commit }, { name }) {
			fetch('/api/pat', {
				method: 'post',
				body: JSON.stringify({ name }),
				headers: { 'Content-Type': 'application/json' }
			})
			.catch(err => {
				Vue.$snotify.error(err, 'cat petting error');
			})
			.then(res => res.json())
			.then(json => {
				commit('updatePatUser', json.name, json.pats);
			});
		},
	},
	getters: {
		pats(state) {
			return state.patUsers;	
		}
	},
});

export default store;