module.exports = function ls(sim, args) {
	let ret = [];
	
	for (let arg of args.split(' ')) {
		let res = sim.fs.at(arg);
		if (!res) {
			ret.push(`ls: cannot access '${arg}': No such file or directory\n`);
			continue;
		} else if (res.type === 'file') {
			ret.push(`${res.shortName}`);
			continue;
		} else {
			// print all files in the dir
			console.log(res);
			ret.push(`${Object.keys(res.contents).join(' ')}\n`);
		}
		
	}

	return ret.join(' ');
}