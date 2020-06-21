import express, { Request, Response, NextFunction } from 'express';
import moment from 'moment';

/**
 * middleware to only allow access if you've logged in.
 * returns 401 if not authorized.
 */
async function adminOnly(req: Request, res: Response, next: NextFunction) {
	if (Auth.checkAuth(req)) {
		return next();
	} else {
		return res.status(401).send({ message: 'Not authorized to access this content.'});
	}
}

/**
 * namespace with admin auth functions
 */
class Auth {
	static login = (req: Request, res: Response, next: NextFunction) => {
		if (req.body.password === process.env.ADMIN_PASS) {
			req.session.auth = {
				expires: moment().add(7, 'days').unix(),
			};
			return next();
		} else {
			return res.status(400).send({ message: 'Invalid password.' });
		}
	}
	static logout = (req: Request, res: Response, next: NextFunction) => {
		if (!Auth.checkAuth(req)) {
			return res.send({ message: 'Not logged in.' });
		}
		delete req.session.auth;
		return next();
	}
	static checkAuth = (req: Request): boolean => { 
		return req.session.auth?.expires >= moment().unix();
	}
}

export { adminOnly, Auth };