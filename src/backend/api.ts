import express, { Request, Response } from 'express';

import { ratelimit } from './util/Bucket';
import { body, query, validationResult } from 'express-validator';

import { PatUser, PatUserSchema } from './db/models/PatUser';

const api = express.Router();

api.get('/', ratelimit(), (req, res) => {
	return res.send('api v1 <3');
});

api.get('/ratelimit/tokens', ratelimit(), (req, res) => {
	return res.send(`${req.session.bucket.tokens}`);
});

api.post('/pat', [
	ratelimit(2),
	body('name').isString().notEmpty().isLength({ max: 20 }).custom(v => v.trim() !== ''),
	body('pats').optional().isInt({ lt: 20, gt: 0 }),
], async (req: Request, res: Response) => {
	// validate
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.array() });
	}
	
	let pats = req.body.pats ?? 1;
	
	return res.send(await PatUser.pat(req.body.name.trim(), pats));
});

api.get('/pat', [
	ratelimit(2),
	query('name').isString().optional()
], async (req: Request, res: Response) => {
	// validate
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.array() });
	}
	
	let name: string | undefined = <string>req.query.name;
	
	if (name) {
		let pats = await PatUser.getPats(name);
		if (!pats) {
			return res.status(400).send(`could nyot find name ${req.query.name}`)
		} else {
			return res.send({ name, pats });
		}
	} else {
		return res.send(await PatUser.allUsers());
	}
	
});

api.all('**', ratelimit(), (req, res) => {
	return res.status(404).send('api endpoint not found ;-;');
});

export default api;