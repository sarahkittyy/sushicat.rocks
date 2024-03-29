require('dotenv').config();
import express from 'express';
import session from 'express-session';
import appRoot from 'app-root-path';
import moment from 'moment';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);

import mongoose from 'mongoose';
import './db/init';

import api from './api';
import { ratelimit } from './util/Bucket';

import http from 'http';
import { Server, Socket } from 'socket.io';
import { ioConfig } from './sockets';

const app = express();
app.use(session({
	secret: process.env.SECRET,
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		secret: process.env.SECRET,
	}),
}));

/// app request logger
app.use((req, res, next) => {
	console.log(`[${moment().format("MM/DD HH:mm:ss")}] ${req.method} ${req.path}`);
	return next();
});

/// other
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// static assets
app.use('/assets', ratelimit(), express.static(appRoot.resolve('assets')));
app.use('/js', ratelimit(), express.static(appRoot.resolve('build/frontend/js')));
app.use('/css', ratelimit(), express.static(appRoot.resolve('build/frontend/css')));
app.get('/favicon.ico', ratelimit(), (req, res) => {
	return res.sendFile(appRoot.resolve('assets/favicon.ico'));
});

/// api endpoints
app.use('/api', api);

/// returning static vue files
app.get('/*', ratelimit(), (req, res) => {
	res.sendFile(appRoot.resolve('build/frontend/index.html'));
});

var basePort = parseInt(process.env.PORT ?? '3000');

const server = http.createServer(app);

const socket = new Server(server);
ioConfig(socket);

server.listen(basePort, () => {
	console.log(`listenin on port ${basePort}`);
});
