const path = require('path');
const fs = require('fs');

module.exports = {
	outputDir: 'build/frontend',
	pages: {
		index: {
			entry: 'src/frontend/index.js',
			template: 'src/frontend/index.html',
			title: '* sooshi cat *',
		},
	},
	runtimeCompiler: true,
	devServer: {
		port: process.env.VUE_APP_PORT,
		public: `${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}`,
		https: true,
		key: (process.env.NODE_ENV === 'production' ? '' : fs.readFileSync('server.key')),
		cert: (process.env.NODE_ENV === 'production' ? '' : fs.readFileSync('server.cert')),
		watchOptions: {
			poll: 1000,
			aggregateTimeout: 500,
		},
		proxy: {
			'/': {
				target: 'http://0.0.0.0:3000',
			},
		},
		writeToDisk: true,
	},
	configureWebpack: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, 'src/frontend/components'),
				'@': path.resolve(__dirname, 'src/frontend/styles'),
			}
		}
	}
};