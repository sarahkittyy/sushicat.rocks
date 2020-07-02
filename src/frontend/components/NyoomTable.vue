<template>
<table class="nyoom-table">
	<tr>
		<th>name</th>
		<th>laps</th>
	</tr>
	<tr v-for="user in $store.getters.nyooms" :key="user.name">
		<td>{{ user.name }}</td>
		<td>{{ user.laps }}</td>
	</tr>
</table>
</template>

<script>
export default {
	name: 'NyoomTable',
	mounted() {
		this.$store.dispatch('fetchNyoomRacers');
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.nyoom-table {
	@include common.font-comic-sans;
	
	border: 1px solid black;
	border-radius: 15px;
	background: common.$grey;
	
	text-align: center;
	
	th, td {
		width: 100px;
	}
}

</style>