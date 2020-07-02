import fetch from 'node-fetch';
import { validateCode } from '../js/fetch';

function deleteNyoomRacer(name) {
	return new Promise((resolve, reject) => {
		fetch('/api/admin/nyooms/delete', {
			method: 'delete',
			body: JSON.stringify({ name }),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(validateCode)
		.then(res => res.json())
		.then(json => {
			resolve(json);
		})
		.catch(err => {
			console.error(err);
			reject({
				error: `Couldn't delete ${name}`,
				message: 'Unknown error.',
				status: err.status,
			});
		});
	});
}

function updateNyoomRacer(name, laps) {
	return new Promise((resolve, reject) => {
		fetch('/api/admin/nyooms/set', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, laps })
		})
		.then(validateCode)
		.then(res => res.json())
		.then(json => resolve(json))
		.catch(err => {
			if (err.status === 401) {
				reject({
					error: 'Unauthorized.',
					message: 'You don\'t have permission to do this.',
					status: err.status,
				});
			}
			else if (err.status === 400) {
				let firstError = err.errors[0];
				if (firstError.param === 'name') {
					reject({
						error: 'Invalid name',
						message: 'Make sure you specify a name to delete.'
					});
				} else {
					reject({
						error: 'Invalid lap count',
						message: 'Make sure you specify an integer number of laps.'
					});
				}
			} else {
				reject({
					error: 'Couldn\'t get laps.',
					message: 'Unknown error.',
					status: err.status,
				});
			}
		});
	});
}

function getAllNyooms() {
	return new Promise((resolve, reject) => {
		fetch('/api/admin/nyooms/get')
		.then(validateCode)
		.then(res => res.json())
		.then(json => resolve(json.users))
		.catch(err => {
			if (err.status === 401) {
				reject({
					error: 'Unauthorized.',
					message: 'You don\'t have permission to do this.',
					status: err.status,
				});
			} else {
				reject({
					error: 'Couldn\'t get laps.',
					message: 'Unknown error.',
					status: err.status,
				});
			}
		});
	});
}

export { deleteNyoomRacer, updateNyoomRacer, getAllNyooms };