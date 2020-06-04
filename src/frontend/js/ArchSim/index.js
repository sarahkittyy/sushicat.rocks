//! load all 'binary' files from ./bin
function loadBinaries() {
	let bins = {};
	
	let ctx = require.context('./bin/', false, /\.bin\.js$/);
	ctx.keys().forEach(b => {
		let binName = /\.\/(.*)\.bin\.js$/.exec(b)[1]
		
		bins[binName] = ctx(b);
	});
	
	return bins;
}

export default class ArchSim {
	constructor() {
		this.history = [];
		
		this.bin = loadBinaries();
		
		this.cwd = '/home/arch';
	}
	
	PS1() {
		return `[arch@arch] ${this.cwdPretty()} $ `;
	}
	
	bootup() {
		return `Arch (tty1)\n\nLogin as: arch (automatic login)\n${this.PS1()}`;
	}
	
	cwdPretty() {
		return this.cwd.replace(/\/home\/arch\//, '~/').replace(/\/home\/arch$/, '~');
	}
	
	// send command, returns response
	sendCommand(input) {
		this.history.push(input);
		if (this.history.length > 100) {
			this.history.shift();
		}
		
		let firstSpace = input.indexOf(' ');
		if (firstSpace == -1) firstSpace = input.length;

		let cmd = input.substr(0,firstSpace);
		let args = input.substr(firstSpace + 1);
		
		if (!(cmd in this.bin)) {
			return `sh: command not found: ${cmd}\n${this.PS1()}`;
		}	
		
		return `${this.bin[cmd](this, args)}${this.PS1()}`;
	}
};