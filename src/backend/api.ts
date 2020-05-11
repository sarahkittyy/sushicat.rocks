import express from 'express';

const api = express.Router();

api.get('/', (req, res) => {
	res.send('api v1 <3');
});

export default api;