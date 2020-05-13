import express from 'express';

import { Bucket } from './util/Bucket';

const api = express.Router();

api.get('/', (req, res) => {
	return res.send('api v1 <3');
});

api.get('/ratelimit/tokens', (req, res) => {
	return res.send(`${req.session.bucket.tokens}`);
});

export default api;