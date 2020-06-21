<template>
<div id="pats">
	<text-input
		v-model="patName"
		placeholder="ur name <3"
		@keyup.native.enter="addPat" />
	<simple-button
		class="pat-button"
		@click="addPat">
		commit cat pat &lt;3
	</simple-button>
	<br />
	<simple-button
		class="pat-button"
		@click="updatePats"
		:disabled="disableUpdate">
		update patboard o3o
	</simple-button>
	<div id="pat-box">
		<table>
			<tr>
				<th>name</th>
				<th>pats</th>
			</tr>
			<tr v-for="item in this.mergedPats" :key="item.name">
				<td>{{ item.name }}</td>
				<td>{{ item.pats }}</td>
			</tr>
		</table>
	</div>
	
	<pat-anim ref="patAnim" />
</div>
</template>

<script>

import SimpleButton from '~/SimpleButton';
import PatAnim from '~/PatAnim';
import TextInput from '~/TextInput';

export default {
	name: 'PatTable',
	data() {
		return {
			patName: '',
			disabled: false,
			tempPats: [],
			disableUpdate: false,
		};
	},
	methods: {
		/// add a temporary, front-end only pat
		addPat() {
			let newPats = [...this.tempPats];

			let name = this.patName;
			
			if (name.length == 0) { return this.$snotify.warning('kitty gotta know who pettin her ;-;', 'kitty is confused'); }
			if (name.length > 20) { return this.$snotify.warning('name too long ;w;', 'kitty is confused'); }
			if (name.trim() === '') { return this.$snotify.warning('name gotta have letters', 'kitty is confused'); }
			
			name = name.trim();
			
			let i = newPats.findIndex(e => e.name === name);

			if (i == -1) {
				newPats.push({ name, pats: 1 });
				this.$refs.patAnim.run();
			} else {
				if (newPats[i].pats >= 20) {
					this.$snotify.warning('kitty needs time to vibe <3', 'slow down >//<');
				} else {
					newPats[i].pats += 1;
					this.$refs.patAnim.run();
				}
			}
			
			this.tempPats = [...newPats];
		},
		updatePats() {
			this.disableUpdate = true;
			this.$store.dispatch('fetchPatUsers');	
			setTimeout(() => {
				this.disableUpdate = false;
			}, 2000);
		},
		/// push all temporary front-end pats to the db
		pushPats() {
			if (this.tempPats.length == 0) return;
			
			for (let user of this.tempPats) {
				this.$store.dispatch('postPatAndUpdate', user);
			}
			this.tempPats = [];
		},
	},
	computed: {
		/// pats merged between temp-pats and actual $store pats
		mergedPats() {
			let res = [];
			for (let p of this.$store.getters.patsUnsorted) {
				res.push({...p});
			}
			
			for (let user of this.tempPats) {
				let i = res.findIndex(e => e.name === user.name);
				if (i == -1) {
					res.push({...user});
				} else {
					res[i].pats += user.pats;
				}
			}

			return res.sort((a, b) => Math.sign(b.pats - a.pats));
		}	
	},
	mounted() {
		let t = setInterval(() => {
			this.pushPats();
		}, 2000);	
		
		document.addEventListener('beforeunload', () => clearInterval(t));
	},
	components: {
		SimpleButton,
		PatAnim,
		TextInput,
	},
};

</script>

<style lang="scss" scoped>

@use '~@/common';

#pats {
	@include common.font-comic-sans;
	
	*:not(table) {
		margin-top: 12px;
	}
	
	margin: 30px;
	display: flexbox;

	text-align: center;
	align-items: center;
	justify-content: center;

	width: 25%;
	padding: 10px;
	
	@media screen and (max-width: common.$small-width) {
		width: 100%;
		margin: 0px;
		padding: 0px;
	}
	
	.pat-button {
		padding: 8px;
		padding-left: 20px;
		padding-right: 20px;

		border-width: 1px;
	}
}

#pat-box {
	border: 1px solid black;
	border-radius: 15px;
	width: 100%;
	overflow: auto;

	table {
		border-collapse: collapse;
		width: 100%;
		border-style: hidden;
		border-spacing: 0;
		
		background: common.$grey;
		
		* {
			padding: 10px;
			padding-top: 5px;
			padding-bottom: 5px;
		}
		
		th {
			font-weight: 900;
			font-size: 14pt;
		}
		
		td, th {
			border: 1px solid black;
		}
	}
}

</style>