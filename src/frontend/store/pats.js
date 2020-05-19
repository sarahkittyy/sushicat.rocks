import Vue from 'vue';

import fetch from 'node-fetch';
import { validateCode } from '../utils/fetch';

function fetchPatUsers() {
	return new Promise((resolve, reject) => {
		fetch('/api/pat')
		.then(validateCode)
		.then(res => res.json())
		.then(json => {
			let users = [];
			for (let user of json) {
				users.push({ name: user.name, pats: user.pats });
			}
			return resolve(users);
		})
		.catch((err) => {
			if (err.status === 429) {
				reject({ message: 'ur doin it rly fast plz slow down', error: 'ewwow gettin pats'});
			} else {
				reject({ message: 'idk somethin bwoke tell sarah >w<', error: 'ewwow gettin pats'});
			}
		});
	});
}

function postPatAndUpdate(name, pats) {
	return new Promise((resolve, reject) => {
		fetch('/api/pat', {
			method: 'post',
			body: JSON.stringify({ name, pats }),
			headers: { 'Content-Type': 'application/json' },
			
		})
		.then(validateCode)
		.then(res => res.json())
		.then(json => {
			resolve({ name: json.name, pats: json.pats });
		})
		.catch(err => {
			/// too fast??
			if (err.status === 429) {
				reject({ error: 'cat petting error', message: 'give the kitty a bweak <3'});
			} else if (err.status === 400 ) {
				let firstError = err.errors[0];
				/// is the name the problem?
				if (firstError.param === 'name') {
					if (name.length === 0) {
						reject({
							message: 'kitty gotta know who pettin her ;-;',
							error: 'kitty is confused'
						});
					} else {
						reject({
							message: 'name too long ;w;',
							error: 'kitty is confused'
						});
					}
				// it must be the amount of pets, then >w<
				} else {
					reject({
						message: 'too many pets!!?!?!??',
						error: 'kitty is SHOOK',
					});
				}
			}
		});
	});
}

export { fetchPatUsers, postPatAndUpdate };