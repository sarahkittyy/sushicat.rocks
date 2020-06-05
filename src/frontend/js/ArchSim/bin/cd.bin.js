module.exports = function cd(sim, args) {
	let res = sim.fs.get(args);
	if (res.code === 404) {
		return `cd: no such file or directory: ${args}\n`;
	} else if (res.code === 400) {
		return `cd: not a directory: ${args}\n`;
	} else {
		sim.fs.to(args);
	}
	
	return '';
}