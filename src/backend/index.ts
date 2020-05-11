require('dotenv').config();
import express from 'express';
import appRoot from 'app-root-path';

import './db/init';

import api from './api';

const app = express();
app.get('/asset', express.static(appRoot.resolve('assets')));
app.get('/js', express.static(appRoot.resolve('build/frontend/js')));
app.get('/css', express.static(appRoot.resolve('build/frontend/css')));

app.use('/api', api);

app.get('/*', (req, res) => {
	res.sendFile(appRoot.resolve('build/frontend/index.html'))
});

app.listen(process.env.BACKEND_PORT ?? 3000, () => {
	console.log('listening!');
});