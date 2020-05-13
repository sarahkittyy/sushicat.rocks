require('dotenv').config();
import express from 'express';
import session from 'express-session';
import appRoot from 'app-root-path';

import './db/init';

import api from './api';

const app = express();
app.use(session({
	secret: process.env.SECRET,
}));

app.use('/assets', express.static(appRoot.resolve('assets')));
app.use('/js', express.static(appRoot.resolve('build/frontend/js')));
app.use('/css', express.static(appRoot.resolve('build/frontend/css')));

app.get('/favicon.ico', (req, res) => {
	return res.sendFile(appRoot.resolve('assets/favicon.ico'));
});

app.use('/api', api);

app.get('/*', (req, res) => {
	res.sendFile(appRoot.resolve('build/frontend/index.html'));
});

app.listen(process.env.BACKEND_PORT ?? 3000, () => {
	console.log('listening!');
});