module.exports = function help(sim, args) {
	return [
		`-- commands --`,
		...Object.keys(sim.bin),
	].join('\n');
}