module.exports = function cat(sim, args) {
	let ret = [];	
	
	for (let arg of args.split(' ')) {
		// resolve to either the cwd, or /, or ~
		let res = sim.fs.at(arg);
		if (res.code === 404) {
			ret.push(`cat: ${arg}: No such file or directory`);
		} else if (res.type === 'directory') {
			ret.push(`cat: ${arg}: Is a directory`);
		} else {
			ret.push(res.contents);
		}
	}
	
	return ret.join('\n');
}