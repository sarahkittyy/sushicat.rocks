<template>
<li class="list-item">
	<span class="list-item-content" @click="redirect">
		<slot />
	</span>
</li>
</template>

<script>
export default {
	name: 'UrlListItem',
	props: {
		to: String,
	},
	data() {
		return {
			
		};
	},
	methods: {
		redirect() {
			this.$router.push(this.to);
		}
	}
};
</script>

<style lang="scss" scoped>

@use "~@/common";

.list-item {
	padding: 3px;

	color: black;
	text-decoration: none;
	
	transition: all 300ms;
}

.list-item-content {
	padding: 3px;
	border: 2px solid transparent;
	
	&:hover {
		cursor: pointer;
		border: 2px outset common.$dark-grey;
	}
	
	&:active {
		border-style: inset;
	}

	transition: all 300ms;
}

</style>