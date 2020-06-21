<template>
<div class="pat-table">
	<table>
		<tr>
			<th>Name</th>
			<th>Pats</th>
			<th>Delete?</th>
		</tr>
		<tr v-for="pat in $store.getters.pats">
			<td>{{ pat.name }}</td>
			<td>
				<input
					type="number"
					:value="pat.pats"
					min="1"
					@keyup.enter="updatePatUser(pat.name, $event.target.value)"
				/>
			</td>
			<td><x-button @click="deletePatUser(pat.name)" /></td>
		</tr>
	</table>
</div>	
</template>

<script>
import XButton from '~/admin/XButton';

export default {
	name: 'PatTable',
	created() {
		this.$store.dispatch('adminFetchPats');
	},
	methods: {
		updatePatUser(name, newValue) {
			this.$store.dispatch('adminUpdatePats', { name, pats: newValue });
			this.$snotify.success(`${name}'s entry updated.`, 'Success');
		},
		deletePatUser(name) {
			this.$store.dispatch('adminDeletePats', { name });
			this.$snotify.success(`${name}'s entry deleted.`, 'Success');
		}
	},
	components: {
		XButton,
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.pat-table {
	@include common.font-roboto;
	
	table {
		border: 2px solid black;
		border-radius: 15px;
		background-color: common.$grey;
		border-spacing: 0;
	
		text-align: center;
	}
	
	th, td {
		padding: 10px;	
		border-bottom: 1px solid black;
		min-width: 100px;
	}

	tr {
	}
}

</style>