//* my attempt at a token bucket algorithm <3

import express, { Request, Response, NextFunction } from 'express';
import moment, { Moment } from 'moment';

interface Bucket {
	tokens: number;
	lastUpdated: number;
};

function newBucket(): Bucket {
	return {
		tokens: parseInt(process.env.MAX_TOKENS),
		lastUpdated: moment().unix(),
	};
};

function updateBucket(b: Bucket): Bucket {
	let now = moment().unix();
	let seconds: number = now - b.lastUpdated;
	
	let maxTokens = parseInt(process.env.MAX_TOKENS);
	let tokenRate = parseInt(process.env.TOKEN_RATE);

	return {
		tokens: Math.min(maxTokens, b.tokens + tokenRate * seconds),
		lastUpdated: now,
	};
};

/// middleware to avoid too many requests
function ratelimit(req: Request, res: Response, next: NextFunction) {
	if (!req.session.bucket) { req.session.bucket = newBucket(); }
	let bucket: Bucket = req.session.bucket;
	
	// update the bucket, given how much time has passed 
	bucket = updateBucket(bucket);
	
	if (bucket.tokens === 0) {
		return res.status(429).send('Too many requests! Try slowing down <3');
	} else {
		bucket.tokens--;
		req.session.bucket = bucket;

		return next();
	}
};

export { ratelimit, Bucket };