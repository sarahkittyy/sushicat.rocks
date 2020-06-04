module.exports = function help(sim, args) {
	return [
		`-- commands --`,
		...Object.keys(sim.bin),
		`-- ........ --`,
		`report bugs @ github.com/sarahkittyy/sushicat.rocks`,
		``
	].join('\n');
}