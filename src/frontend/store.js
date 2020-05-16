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
			} else {
				users.push(user);
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
				Vue.$snotify.error('idk somethin bwoke tell sarah >w<', 'error gettin pats');
				console.error(err);
			});
		},
		patAndUpdate({ commit }, { name, pats }) {
			fetch('/api/pat', {
				method: 'post',
				body: JSON.stringify({ name, pats }),
				headers: { 'Content-Type': 'application/json' },
				
			})
			.then(validateCode)
			.then(res => res.json())
			.then(json => {
				commit('updatePatUser', { name: json.name, pats: json.pats });
			})
			.catch(err => {
				console.error(err);
				/// too fast??
				if (err.status === 429) {
					Vue.$snotify.error('give the kitty a bweak <3', 'cat petting error');
				} else if (err.status === 400 ) {
					let firstError = err.errors[0];
					/// is the name the problem?
					if (firstError.param === 'name') {
						if (name.length === 0) {
							Vue.$snotify.warning('kitty gotta know who pettin her ;-;', 'kitty is confused')
						} else {
							Vue.$snotify.warning('name too long ;w;', 'kitty is confused');
						}
					// it must be the amount of pets, then >w<
					} else {
						Vue.$snotify.error('too many pets!!?!?!??', 'kitty is SHOOK');
					}
				}
			});
		},
	},
	getters: {
		pats(state) {
			return state.patUsers.sort((a, b) => Math.sign(b.pats - a.pats));	
		},
		patsUnsorted(state) {
			return state.patUsers;
		}
	},
});

export default store;