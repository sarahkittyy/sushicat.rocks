<template>
<div class="arch-container">
	<div id="terminal">
		<span v-for="(line, index) in textLines"class="text output">{{ line }}<br v-if="index != (textLines.length - 1)" /></span>
		<input 
			ref="input"
			class="text input-hide"
			v-model="input"
			autofocus
			@blur="refocus"
			@keydown.enter="submit"
			:style="inputWidth"
		>
		</input>
	</div>
</div> 
</template>

<script>
import ArchSim from '../js/ArchSim';

export default {
	name: 'ArchLinux',
	data() {
		return {
			sim: new ArchSim(),
			input: "",
			text: "",
			inputBox: null
		};
	},
	methods: {
		submit() {
			this.text += this.input + '\n';
			let res = this.sim.sendCommand(this.input);
			
			// search for special escape codes
			let test = [...res.matchAll(/\\#\[(\w+)\]/g)];
			for (let match of test) {
				return this.handleEscapeCode(match[1]);
			}
			
			this.input = "";
			this.text += res;
		},
		refocus() {
			if (this.inputBox) this.inputBox.focus();
		},
		handleEscapeCode(code) {
			switch(code){
				case 'clear':
					this.text = `${this.sim.PS1()}`;
					this.input = "";
					break;
				default:
					break;
			}
		}
	},
	computed: {
		textLines() {
			return this.text.split('\n');
		},
		inputWidth() {
			return `width: ${this.input.length + 1}ch`;
		}
	},
	mounted() {
		this.inputBox = this.$refs.input;
		this.inputBox.focus();

		this.text = this.sim.bootup();
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.text {
	font-family: 'CP437';
	color: #ccc;
	font-size: 24px;
	font-weight: 100;
}

.input-hide {
	outline: none;
	border: none;
	padding: none;
	background: none;
	text-decoration: none;
}

.output {
	outline: none;
	border: none;
	background: none;
	
	text-decoration: none;
	
	resize: none;
	
	width: 99%;
	height: 92%;
	
	margin: none;
	padding: none;
}

*::-webkit-scrollbar {
	width: 8px;
}
*::-webkit-scrollbar-track {
	background: black;
}
*::-webkit-scrollbar-thumb {
	background-color: common.$dark-grey;
	border-radius: 10px;
	border: 1px solid common.$grey;
}

.arch-container {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	
	justify-content: center;
	
	background-color: black;
	
	#terminal {
		overflow-y: scroll;
		width: 90%;
		margin-top: 5%;
		margin-bottom: 5%;
		
		scrollbar-width: thin;
		scrollbar-color: common.$dark-grey common.$grey;
	}
}

</style>