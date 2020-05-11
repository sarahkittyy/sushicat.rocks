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
		port: 8000,
		proxy: {
			'/': {
				target: 'http://0.0.0.0:3000',
			},
		},
		writeToDisk: true,
	},
};