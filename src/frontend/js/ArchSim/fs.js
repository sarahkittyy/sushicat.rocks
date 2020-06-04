const fsData = require('./fs.json');

export { fsData as rawFsData };

const ctx = require.context('./files/', false, /\.js$/);

/// get file contents given the name in files/
function getFileContents(name) {
	return ctx(`./${name}.js`);
}

/// dirs that update based on the state of sim
let procDirs = {
	'bin': {}
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
	let dir = p.pop();
	
	let point = fsData.fs;
	for(let dir of p) {
		point = point[dir];
		// special folder handling
		if (point === "proc") {
			return null; //TODO: implement
		}
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