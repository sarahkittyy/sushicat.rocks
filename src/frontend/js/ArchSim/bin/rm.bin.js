module.exports = function rm(sim, args) {
	let ret = [];
	for(let file of args.split(' ')) {
		let res = sim.fs.rm(file);
		if (res.code === 404) {
			ret.push(`rm: cannot remove '${file}': No such file or directory`);
		} else if (res.code === 401) {
			ret.push(`rm: cannot remove '${file}': Permission denied`);
		} else if (res.code === 400) {
			ret.push(`rm: cannot remove '${file}': Is a directory`);
		}
	}
	
	return ret.join('\n');
}