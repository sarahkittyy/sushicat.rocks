import express, { Request, Response } from 'express';

import { ratelimit } from '../util/Bucket';
import { body, query, validationResult } from 'express-validator';

import { PatUser, PatUserSchema } from '../db/models/PatUser';
import { IsaacBonk } from '../db/models/IsaacBonk';
import { incArf, getArfs } from './arfs';
import { NyoomRacer } from '../db/models/NyoomRacer';

import admin from './admin';

import client from '../util/twitter';

const api = express.Router();

api.get('/', ratelimit(), (req, res) => {
	console.log('nyah...');
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

api.route('/arf')
	.post(ratelimit(), async (req, res) => {
		if (req.session.hasArfed) {
			return res.send({ arfs: await getArfs() });
		} else {
			req.session.hasArfed = true;
			req.session.save(console.error);
			return res.send({ arfs: await incArf() });
		}
	})
	.get(ratelimit(), async (req, res) => {
		return res.send({ arfs: await getArfs() });
	});

api.get('/leffen_tweet', ratelimit(), (req, res) => {
	client.get('/statuses/user_timeline', {
		screen_name: 'DeepLeffen',
		count: 20,
		tweet_mode: 'extended',
	})
	.then((tweets) => {
		let filtered = tweets.filter((t: any) => !t.full_text.startsWith('Uncut'))
		let t = filtered[Math.floor(Math.random() * filtered.length)];
		return res.send(t.full_text);
	})
	.catch((err) => {
		console.error(err);
		return res.send(`Couldn't retrieve tweets :(`);
	});
});

api.get('/nyooms', ratelimit(), async (req, res) => {
	return res.send(await NyoomRacer.find().select('name laps').lean());
});

api.get('/isaac-bonk', ratelimit(8), async (req, res) => {
	return res.send({ count: await IsaacBonk.do() });
});

api.use('/admin', admin);
	
api.all('**', ratelimit(), (req, res) => {
	return res.status(404).send('api endpoint not found ;-;');
});

export default api;
