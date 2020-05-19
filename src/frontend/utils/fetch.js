/// utils for node-fetch

async function validateCode(response) {
	if (!response.ok) {
		if (response.headers.get("content-type").indexOf("application/json") !== -1) {
			throw {...(await response.json()), status: response.status};
		} else {
			throw { response, status: response.status };
		}
	} else {
		return response;
	}
};

export { validateCode };