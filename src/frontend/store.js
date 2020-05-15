import Vue from 'vue';
import Vuex from 'vuex';

import fetch from 'node-fetch';
import { validateCode } from './utils/fetch';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		patUsers: [],
	},
	mutations: {
		setPatUsers(state, users) {
			state.patUsers = users;
		},
		updatePatUser(state, user) {
			let users = [...state.patUsers];

			let i = users.findIndex(e => e.name === user.name);
			if (i != -1) {
				users[i] = user;
			}
			
			state.patUsers = [...users];		
		},
	},
	actions: {
		updatePatUsers({ commit }) {
			fetch('/api/pat')
			.then(validateCode)
			.then(res => res.json())
			.then(json => {
				let users = [];
				for (let user of json) {
					users.push({ name: user.name, pats: user.pats });
				}
				commit('setPatUsers', users);
			})
			.catch((err) => {
				Vue.$snotify.error(err, 'error gettin pats');
			});
		},
		patAndUpdate({ commit }, { name }) {
			fetch('/api/pat', {
				method: 'post',
				body: JSON.stringify({ name }),
				headers: { 'Content-Type': 'application/json' },
				
			})
			.then(validateCode)
			.then(res => res.json())
			.then(json => {
				commit('updatePatUser', { name: json.name, pats: json.pats });
			})
			.catch(err => {
				Vue.$snotify.error(err, 'cat petting error');
			});
		},
	},
	getters: {
		pats(state) {
			return state.patUsers.sort((a, b) => Math.sign(b.pats - a.pats));	
		},
	},
});

export default store;