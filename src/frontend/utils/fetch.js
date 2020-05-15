/// utils for node-fetch

function validateCode(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	} else {
		return response;
	}
};

module.exports = {
	validateCode
};