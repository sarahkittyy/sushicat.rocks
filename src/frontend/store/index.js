import Vue from 'vue';
import Vuex from 'vuex';

import fetch from 'node-fetch';
import { validateCode } from '../utils/fetch';

import { fetchPatUsers, postPatAndUpdate } from './pats';

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
			fetchPatUsers()
			.then((users) => {
				commit('setPatUsers', users);
			})
			.catch(({ error, message }) => Vue.$snotify.error(message, error));
		},
		patAndUpdate({ commit }, { name, pats }) {
			postPatAndUpdate(name, pats)
			.then(user => {
				commit('updatePatUser', user);
			})
			.catch(({message, error}) => Vue.$snotify.error(message, error));
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