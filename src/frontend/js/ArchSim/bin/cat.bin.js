const { resolveFile } = require('../fs');

module.exports = function cat(sim, args) {
	// resolve to either the cwd, or /, or ~
	let res = resolveFile(sim, args);
	if (!res) {
		return `cat: ${args}: No such file or directory\n`;
	}
	return res.contents;
}