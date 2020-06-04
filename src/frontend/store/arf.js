import fetch from 'node-fetch';
import { validateCode } from '../js/fetch';

function postArf() {
	return new Promise((resolve, reject) => {
		fetch('/api/arf', {
			method: 'post',
			
		})
		.then(validateCode)
		.then(res => res.json())
		.then(res => resolve(res))
		.catch(err => {
			if (err.status == 429) {
				reject({
					error: 'couldn\'t arf ;-;',
					message: 'ur sendin lots of requests',
					status: err.status,
				});
			} else if (err.status == 400) {
				reject({
					error: 'couldn\'t arf ;-;',
					message: 'you\'ve alweady arf\'d!!',
					status: err.status,
				});
			} else {
				reject({
					error: 'couldn\'t arf ;-;',
					message: 'pls text sawah <3',
					status: err.status,
				});
			}
		});
	});
}

function fetchArfs() {
	return new Promise((resolve, reject) => {
		fetch('/api/arf')
		.then(validateCode)
		.then(res => res.json())
		.then(res => resolve(res))
		.catch(err => {
			if (err.status == 429) {
				reject({
					error: 'couldn\'t get arfs',
					message: 'ur sendin lots of requests',
					status: err.status,
				});
			} else {
				reject({
					error: 'couldn\'t get arfs',
					message: 'pls text sawah <3',
					status: err.status,
				});
			}
		});
	});
}

export { postArf, fetchArfs };