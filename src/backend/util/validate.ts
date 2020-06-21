import { validationResult } from 'express-validator';
import express, { Request, Response, NextFunction } from 'express';

export default function validate(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.array() });
	} else {
		return next();
	}
}