const { resolveDir } = require('../fs');

module.exports = function cd(sim, args) {
	let dir = resolveDir(sim, args);
	if (!dir) {
		return `cd: no such file or directory: ${args}\n`;
	}
	let { data, path } = dir;
	
	/// if it's a file, that's an error
	if (typeof data === 'string' || data instanceof String) {
		return `cd: not a directory: ${args}\n`;
	}
	
	// else, change the cwd
	sim.cwd = path;
	return '';
}