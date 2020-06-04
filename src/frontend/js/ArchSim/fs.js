const fsData = require('./fs.json');

export { fsData as rawFsData };

const ctx = require.context('./', true, /\.\/(bin|files)\/.*\.js$/);

/// get file contents given the name in files/
function getFileContents(name) {
	return ctx(`./${name}.js`);
}

/// return an object of any simulation-dependent paths
function extraPaths(sim) {
	function binToName(file) {
		return file.replace(/\.\/bin\/(\w+)\.bin\.js$/, '$1');
	}
	
	
	return {
		bin: ctx.keys().reduce((o, s) => {
			let name = binToName(s);
			if (name === s) return o;
			o[name] = `bin/${name}.bin`;
			return o;
		}, {})
	};
}

/**
 * @return filedata if the file exists, otherwise null,
 * also returns 'directory' if you ask for a directory
 */
export function resolveFile(sim, path) {
	let i = path.lastIndexOf('/');
	let fileDir = path.substr(0, i)
	let fileName = path.substr(i + 1);

	let dir = resolveDir(sim, fileDir).data;
	let file = dir[fileName];
	
	if (!dir) {
		return null;
	} else if (!file) {
		return null;
	} else if (!(typeof file === 'string' || file instanceof String)) {
		return 'directory';
	} else {
		let contents = getFileContents(file);
		return {
			file: fileName,
			contents
		};
	}
}

/**
 * @return the folder data if the folder exists, otherwise null
 */
export function resolveDir(sim, path) {
	let solvedPath;
	
	// resolve paths relative to root
	if (path.startsWith('/')) {
		solvedPath = path;
	} else if (path.startsWith('~')) {
		solvedPath = `/home/arch/${path.replace(/^~\/?/, '')}`;
	} else {
		solvedPath = `${sim.cwd}/${path}`;
	}
	
	let p = solvedPath.split('/')
		.filter(Boolean)
		.map(s => s.trim())
		.filter(s => s != '.');
	if (p.length === 0) {
		return {
			path: solvedPath,
			data: { ...fsData.fs, ...extraPaths(sim) },
		};
	}
	let dir = p.pop();
	
	let point = {
		...fsData.fs,
		...extraPaths(sim),
	};
	for(let subdir of p) {
		point = point[subdir];

		if (point == null) {
			return null;
		}
	}
	
	let finalDir = point[dir];
	if (!finalDir) {
		return null;
	} else {
		return {
			path: solvedPath,
			data: finalDir,
		};
	}
}