//* my attempt at a leaky bucket algorithm <3

import express, { Request, Response, NextFunction } from 'express';

interface Droplet {
	made: Date;
};

interface Bucket {
	requests: Droplet[];
};

function emptyBucket(): Bucket {
	return {
		requests: []
	};
};

function isFull(b: Bucket): boolean {
	return b.requests.length >= parseInt(process.env.MAX_REQ);
};

/// middleware to avoid too many requests
function ratelimit(req: Request, res: Response, next: NextFunction) {
	if (!req.session.bucket) { req.session.bucket = emptyBucket(); }
	let bucket: Bucket = req.session.bucket;
	

	next();
};

export { ratelimit };