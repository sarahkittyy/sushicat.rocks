import express from 'express';

import { ratelimit } from './util/Bucket';

const api = express.Router();

api.get('/', ratelimit(1), (req, res) => {
	return res.send('api v1 <3');
});

api.get('/ratelimit/tokens', ratelimit(3), (req, res) => {
	return res.send(`${req.session.bucket.tokens}`);
});

export default api;