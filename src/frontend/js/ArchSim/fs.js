const fsData = require('./fs.json');
const ctx = require.context('./', true, /\.\/(bin|files)\/.*\.js$/);

const unset = require('lodash.unset');

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

/**
 * CODES:
 * 404 -- file / path not found
 * 400 -- it was the wrong type (got file, expected dir, etc)
 * 200 -- OK
 */
export class FS {
	// init
	constructor(sim) {
		this.sim = sim;
		
		this.fsData = {
			...fsData.fs,
			...extraPaths(sim)
		};
		this.traversed = [];
		
		this.saveData = [];
	}
	
	/**
	 * go to a directory in the current folder
	 * return:
	 * { code: 404,400,200 
	 * , file?: the file if we couldn't enter it as a dir
	 * }
	 */
	go(key) {
		if (key === '..') {
			this.traversed.pop();
		} else if (!this.get().contents[key]) {
			return { code: 404 };
		/// if it's a file
		} else if (typeof this.get().contents[key] === 'string') {
			return { code: 400 };
		} else {
			this.traversed.push(key);
		}
		return { code: 200 };
	}
	
	/// save a backup of this.traversed
	push() {
		this.saveData.push([...this.traversed]);
	}
	
	/// load the lastest backup of this.traversed
	pop() {
		this.traversed = [...this.saveData.pop()];
	}
	
	/// remove a file
	/// return { code: Number }
	rm(path) {
		let r = this.get(path);
		if (!r) {
			return null;
		} else {
			this.push();
			
			let r = this.to(path);
			if (r.code === 404) {
				this.pop();
				return { code: 404 };
			} else if (r.fileName) {
				unset(this.fsData, [...this.traversed, r.fileName]);
				this.pop();
				return { code: 200 };
			} else {
				this.pop();
				return { code: 400 };
			}
		}
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
	 * }
	 */
	get(fileName) {
		// navigate the fs
		let p = this.fsData;
		for (let link of this.traversed) {
			p = p[link];
		}
		if (fileName) { p = p[fileName]; }
		
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
	
	at(path) {
		this.push();

		let tr = this.to(path);
		if (tr.code === 404) {
			this.pop();
			return { code: 404 };
		} else if (!!tr.fileName) { // if we nav to a file
			// return that file
			let f = this.get(tr.fileName);
			this.pop();
			return f;
		}

		// else just return the dir
		let r = this.get();
		this.pop();
		return r;
	}
	
	/// moves to the path given
	to(path) {
		// backup this.traversed
		this.push();
		
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
			/// if it's a file
			if (res.code === 400) {
				// don't pop, just return the file
				return {
					code: 300,
					fileName: link
				};
			}
			/// if it's not ok
			if (res.code !== 200) {
				/// give up and return error
				this.pop();
				return {
					code: res.code,
				};
			}
		}
		
		return {
			code: 200,
		};
	}
};