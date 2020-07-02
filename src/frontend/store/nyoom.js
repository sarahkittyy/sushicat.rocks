import fetch from 'node-fetch';
import { validateCode } from '../js/fetch';

function fetchNyoomRacers() {
	return new Promise((resolve, reject) => {
		fetch('/api/nyooms')
		.then(validateCode)
		.then(res => res.json())
		.then(json => {
			let users = [];
			for (let user of json) {
				users.push({name: user.name, laps: user.laps});
			}
			return resolve(users);
		})
		.catch((err) => {
			if (err.status === 429) {
				reject({
					error: 'nyoom error',
					message: 'retrieving nyooms too fast',
					status: err.status,
				});
			} else {
				reject({
					error: 'nyoom error',
					message: 'somethin went wrong idk ;-;',
					status: err.status,
				});
			}
		})
	})
}

export { fetchNyoomRacers };