const { resolveDir, resolveFile } = require('../fs');

module.exports = function ls(sim, args) {
	let ret = [];
	
	for (let arg of args.split(' ')) {
		let dir = resolveDir(sim, arg);
		if (!dir) {
			ret.push(`ls: cannot access '${arg}': No such file or directory\n`);
			continue;
		}
		let { data } = dir;
		
		// if we actually resolved a file, just print the filename
		if (typeof data === 'string' || data instanceof String) {
			ret.push(`${resolveFile(sim, dir.path).file}\n`);
			continue;
		}
		// else, print all files in the dir
		ret.push(`${Object.keys(data).join(' ')}\n`);
	}

	return ret.join(' ');
}