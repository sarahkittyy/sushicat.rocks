const { resolveFile } = require('../fs');

module.exports = function cat(sim, args) {
	let ret = [];	
	
	for (let arg of args.split(' ')) {
		// resolve to either the cwd, or /, or ~
		let res = resolveFile(sim, arg);
		if (!res) {
			ret.push(`cat: ${arg}: No such file or directory`);
		} else if (res === 'directory') {
			ret.push(`cat: ${arg}: Is a directory`);
		}
		ret.push(res.contents);
	}
	
	return ret.join('\n');
}