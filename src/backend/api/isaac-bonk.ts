import express from 'express';
import cors from 'cors';

import { IsaacBonk } from '../db/models/IsaacBonk';

import { ratelimit } from '../util/Bucket';

const bonk = express.Router();

let queued = 0;
let ct = 0;
bonk.get('/', [
	cors(), 
	ratelimit()
], async (req, res) => {
	queued++;
	return res.send({ count: ct });
});
setInterval(async () => {
	if (queued != 0) {
		ct = await IsaacBonk.do(queued);
		queued = 0;
	}
}, 4000);

export default bonk;
