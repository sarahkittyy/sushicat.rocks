module.exports = function cd(sim, args) {
	let res = sim.fs.get(args);
	if (!res) {
		return `cd: no such file or directory: ${args}\n`;
	} else if (res.type === 'file') {
		return `cd: not a directory: ${args}\n`;
	} else {
		sim.fs.to(args);
	}
	
	return '';
}