const fetch = require('node-fetch');

module.exports = async function leffen_tweet(sim, args) {
	const res = await fetch('/api/leffen_tweet');
	return await res.text();
}