module.exports = {
	outputDir: 'build/frontend',
	pages: {
		index: {
			entry: 'src/frontend/index.js',
			template: 'src/frontend/index.html',
			title: 'untitled',
		},
	},
	runtimeCompiler: true,
	devServer: {
		port: process.env.VUE_APP_PORT,
		public: `${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}`,
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
};