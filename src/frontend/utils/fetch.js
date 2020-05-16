/// utils for node-fetch

async function validateCode(response) {
	if (!response.ok) {
		throw {...(await response.json()), status: response.status};
	} else {
		return response;
	}
};

module.exports = {
	validateCode
};