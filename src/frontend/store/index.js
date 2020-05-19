import Vue from 'vue';
import Vuex from 'vuex';

import * as pat from './pats';
import * as arf from './arf';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		patUsers: [],
		totalArfs: 0,
	},
	mutations: {
		setPatUsers(state, users) {
			state.patUsers = users;
		},
		setPatUser(state, user) {
			let users = [...state.patUsers];

			let i = users.findIndex(e => e.name === user.name);
			if (i != -1) {
				users[i] = user;
			} else {
				users.push(user);
			}
			
			state.patUsers = [...users];
		},
		setTotalArfs(state, arfs) {
			state.totalArfs = arfs;
		},
	},
	actions: {
		fetchPatUsers({ commit }) {
			pat.fetchPatUsers()
			.then((users) => {
				commit('setPatUsers', users);
			})
			.catch(({ error, message }) => Vue.$snotify.error(message, error));
		},
		postPatAndUpdate({ commit }, { name, pats }) {
			pat.postPatAndUpdate(name, pats)
			.then(user => {
				commit('setPatUser', user);
			})
			.catch(({message, error}) => Vue.$snotify.error(message, error));
		},
		postArf({ commit }) {
			arf.postArf()
			.then(({ arfs }) => commit('setTotalArfs', arfs))
			.catch(({error, message, status}) => {
				if (status != 400) {
					Vue.$snotify.error(message, error);
				}
			});
		},
		fetchArfs({ commit }) {
			arf.fetchArfs()
			.then(({ arfs }) => commit('setTotalArfs', arfs))
			.catch(({error, message}) => {
				Vue.$snotify.error(message, error);
			});
		},
	},
	getters: {
		pats(state) {
			return state.patUsers.sort((a, b) => Math.sign(b.pats - a.pats));	
		},
		patsUnsorted(state) {
			return state.patUsers;
		},
		arfs(state) {
			return state.totalArfs;
		}
	},
});

export default store;