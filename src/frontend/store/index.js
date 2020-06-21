import Vue from 'vue';
import Vuex from 'vuex';

import * as pat from './pats';
import * as arf from './arf';
import * as auth from './auth';
import * as apat from './adminPats';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		patUsers: [],
		totalArfs: 0,
		adminStatus: false,
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
		setAdminStatus(state, status) {
			state.adminStatus = status;
		}
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
		adminFetchPats({ commit }) {
			apat.getAllPats()
			.then(users => {
				commit('setPatUsers', users);
			})
			.catch(({ error, message, status }) => {
				Vue.$snotify.error(message, error);
				if (status === 401) {
					commit('setAdminStatus', false);
				}
			});
		},
		adminDeletePats({ commit }, { name }) {
			apat.deletePatUser(name)
			.then(() => {
				let pats = this.getters.patsUnsorted.filter(p => p.name !== name);
				commit('setPatUsers', pats);
			})
			.catch(({ error, message, status }) => {
				Vue.$snotify.error(message, error);
				if (status === 401) {
					commit('setAdminStatus', false);
				}
			});
		},
		adminUpdatePats({ commit }, { name, pats }) {
			apat.updatePatUser(name, pats)
			.then(user => commit('setPatUser', user))
			.catch(({ error, message, status }) => {
				Vue.$snotify.error(message, error);
				if (status === 401) {
					commit('setAdminStatus', false);
				}
			});
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
		adminLogin({ commit }, { password }) {
			auth.login(password)
			.then(() => commit('setAdminStatus', true))
			.catch(({error, message}) => {
				Vue.$snotify.error(message, error);
			});
		},
		adminLogout({ commit }) {
			auth.logout()
			.then(() => {
				commit('setAdminStatus', false);
			})
			.catch(({ error, message }) => {
				Vue.$snotify.error(message, error);
			})
		},
		adminCheckStatus({commit}) {
			auth.status()
			.then((v) => {
				commit('setAdminStatus', v);
			})
			.catch(({error, message}) => {
				Vue.$snotify.error(message, error);
			})
		}
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
		},
		admin(state) {
			return state.adminStatus;
		},
	},
});

export default store;