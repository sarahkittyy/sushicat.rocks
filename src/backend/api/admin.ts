import express, { Request, Response, NextFunction } from 'express';
import { adminOnly, Auth } from '../util/auth';
import { body, validationResult } from 'express-validator';

import { ratelimit } from '../util/Bucket';
import validate from '../util/validate';

import { PatUser } from '../db/models/PatUser';
import { NyoomRacer } from '../db/models/NyoomRacer';

const admin = express.Router();

//* Main auth endpoints
admin.post('/login', Auth.login, (req: Request, res: Response) => {
	return res.send({ message: 'Successfully authorized. '});
});

admin.post('/logout', Auth.logout, (req: Request, res: Response) => {
	return res.send({ message: 'Logged out.' });
});

admin.get('/status', (req: Request, res: Response) => {
	return res.send({ auth: Auth.checkAuth(req) });
});

//* Special admin-only routes

const pats = express.Router();
pats.use(adminOnly);

pats.delete('/delete', [
	body('name').isString(),
	validate
], async (req: Request, res: Response) => {
	await PatUser.findOneAndDelete({name: req.body.name});
	return res.send({ message: 'Deleted!' });
});

pats.post('/set', [
	body('name').isString(),
	body('pats').isNumeric(),
	validate
], async (req: Request, res: Response) => {
	let newUser = await PatUser.findOneAndUpdate(
		{ name: req.body.name }, 
		{ $set: { pats: req.body.pats }},
		{ upsert: true, new: true }
	).select('name pats').lean();
	return res.send(newUser);
});

pats.get('/get', async (req: Request, res: Response) => {
	let users = await PatUser.find({}, 'name pats').lean();
	return res.send({ users });
});

const nyooms = express.Router();
nyooms.use(adminOnly);

nyooms.delete('/delete', [
	body('name').isString(),
	validate
], async (req: Request, res: Response) => {
	await NyoomRacer.findOneAndDelete({ name: req.body.name });
	return res.send({ message: 'Deleted!' });
});

nyooms.post('/set', [
	body('name').isString(),
	body('laps').isNumeric(),
	validate
], async (req: Request, res: Response) => {
	let newRacer = await NyoomRacer.findOneAndUpdate(
		{ name: req.body.name },
		{ $set: { laps: req.body.laps }},
		{ upsert: true, new: true }
	).select('name laps').lean();
	return res.send(newRacer);
});

nyooms.get('/get', async (req: Request, res: Response) => {
	let users = await NyoomRacer.find({}, 'name laps').lean();
	return res.send({ users });
})

admin.use('/pats', pats);
admin.use('/nyooms', nyooms);

export default admin;