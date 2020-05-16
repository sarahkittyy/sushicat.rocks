<template>
<div id="pats" class="font-comic-sans">
	<b-form-input
		v-model="patName"
		placeholder="ur name <3"
		class="name-input" />		
	<simple-button
		class="pat-button"
		@click="sendPat">
		pet the cat &lt;3
	</simple-button>
	<div id="pat-box">
		<table>
			<tr>
				<th>name</th>
				<th>pats</th>
			</tr>
			<tr v-for="item in this.$store.getters.pats" :key="item.name">
				<td>{{ item.name }}</td>
				<td>{{ item.pats }}</td>
			</tr>
		</table>
	</div>
</div>
</template>

<script>

import SimpleButton from '../components/SimpleButton';

export default {
	name: 'PatTable',
	data() {
		return {
			patName: ''
		};
	},
	methods: {
		sendPat() {
			this.$store.dispatch('patAndUpdate', { name: this.patName });
		},
	},
	components: {
		SimpleButton,
	},
};

</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

#pats {
	margin: 30px;
	display: flexbox;

	text-align: center;
	align-items: center;
	justify-content: center;

	width: 25%;
	padding: 10px;
	
	.pat-button {
		margin: 12px;

		padding: 8px;
		padding-left: 20px;
		padding-right: 20px;

		border-width: 1px;
	}
	
	.name-input {
		text-align: center;
		font-size: 12pt;
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
		
		background: #aaa;
		
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