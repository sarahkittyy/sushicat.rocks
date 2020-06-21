import fetch from 'node-fetch';
import { validateCode } from '../js/fetch';

function login(password) {
	return new Promise((resolve, reject) => {
		fetch('/api/admin/login', {
			method: 'post',
			body: JSON.stringify({ password }),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(validateCode)
		.then(res => res.json())
		.then(json => resolve(json))
		.catch(err => {
			if (err.status === 400) {
				reject({ error: 'Login Error', message: 'Invalid password.'});
			}
		});
	});
}

function logout() {
	return new Promise((resolve, reject) => {
		fetch('/api/admin/logout', {
			method: 'post'
		})
		.then(validateCode)
		.then(res => res.json())
		.then(json => resolve(json))
		.catch(err => {
			reject({error: 'Unknown Error', message: 'Contact sarah <3'});
		});
	});
}

function status() {
	return new Promise((resolve, reject) => {
		fetch('/api/admin/status')
		.then(validateCode)
		.then(res => res.json())
		.then(json => resolve(json.auth))
		.catch(err => {
			reject({error: 'Unknown Error', message: 'Contact sarah <3'});
		});
	});
}

export { login, status, logout };