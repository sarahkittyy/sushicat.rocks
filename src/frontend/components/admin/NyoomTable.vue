<template>
<table class="nyoom-table">
	<tr>
		<th>Name</th>
		<th>Laps</th>
		<th>Delete?</th>
	</tr>
	<tr v-for="user in $store.getters.nyooms" :key="user.name">
		<td>{{ user.name }}</td>
		<td>
			<input
				type="number"
				:value="user.laps"
				min="1"
				@keyup.enter="updateNyoomRacer(user.name, $event.target.value)"
			/>
		</td>
		<td><x-button @click="deleteNyoomRacer(user.name)" /></td>
	</tr>
</table>
</template>

<script>
import XButton from '~/admin/XButton';

export default {
	name: 'NyoomTable',
	created() {
		this.$store.dispatch('adminFetchNyooms');
	},
	methods: {
		updateNyoomRacer(name, newValue) {
			this.$store.dispatch('adminUpdateNyooms', { name, laps: newValue });
			this.$snotify.success(`${name}'s entry updated.`, `Success`);
		},
		deleteNyoomRacer(name) {
			this.$store.dispatch('adminDeleteNyooms', { name });
			this.$snotify.success(`${name}'s entry deleted.`, `Success`);
		}
	},
	components: {
		XButton,
	},
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.nyoom-table {
	@include common.font-roboto;
	
	border: 2px solid black;
	border-radius: 15px;
	background-color: common.$grey;
	border-spacing: 0;
	
	text-align: center;
	
	th, td {
		padding: 10px;
		border-bottom: 1px solid black;
		min-width: 100px;
	}
}

</style>