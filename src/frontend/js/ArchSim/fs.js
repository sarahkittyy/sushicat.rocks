const fsData = require('./fs.json');
const ctx = require.context('./', true, /\.\/(bin|files)\/.*\.js$/);

/// return an object of any extra paths
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

function readFile(file) {
	return ctx(`./${file}.js`);
}

export class FS {
	// init
	constructor(sim) {
		this.sim = sim;
		
		this.fsData = {
			...fsData.fs,
			...extraPaths(sim)
		};
		this.traversed = [];
	}
	
	/// go to a directory in the current folder
	go(key) {
		if (key === '..') {
			this.traversed.pop();
		} else if (!this.get().contents[key]) {
			return false;
		} else {
			this.traversed.push(key);
		}
		return this;
	}
	
	cwd() {
		let s = this.traversed.join('/');
		if (!s.startsWith('/')) s = `/${s}`;
		return s;
	}
	
	/**
	 * returns: {
	 * 	type: 'file' | 'directory',
	 *  shortName: String,
	 *  contents: String | object
	 * } | null
	 */
	get(path) {
		if (path) {
			this.traversedSave = [...this.traversed];
			let t = this.to(path);
			if (!t.success) { return null; }
			let res = this.get();
			this.traversed = [...this.traversedSave];
			return res;
		}
		
		// navigate the fs
		let p = this.fsData;
		for (let link of this.traversed) {
			p = p[link];
		}
		
		// is it a file?
		if (typeof p === 'string') {
			return {
				type: 'file',
				contents: readFile(p),
				shortName: this.traversed.slice(-1)[0],
			};
		} else {
			return {
				type: 'directory',
				contents: p,
				shortName: this.traversed.slice(-1)[0],
			};
		}
	}
	
	/// from a path input to a directory -- returns {
	///		success: Boolean
	///		code: Number
	/// }
	/// if success is false, the cwd is not changed
	to(path) {
		// backup this.traversed
		this.traversedSave = [...this.traversed];
		
		// split the path
		let arr = path
			.split('/')
			.map(s => s.trim())
			.filter(Boolean)
			.filter(s => s !== '.');
			
		// does the path start from root?
		const root = path.startsWith('/');
		// does the path start from home?
		const home = arr[0] === '~';
		
		// nav to where we need to be
		if (root) {
			this.traversed = [];
		} else if (home) {
			this.traversed = ["home", "arch"];
		}
		
		// for every next path to nav to
		for (let link of arr) {
			let res = this.go(link);
			if (!res) {
				this.traversed = [...this.traversedSave];
				return {
					success: false,
					code: 404,
				};
			}
		}
		
		return {
			success: true,
			code: 200,
		};
	}
};