<template>
<li class="list-item" @click="redirect">
	<span class="list-item-content">
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
	
	border: 2px solid transparent;
	
	&:hover {
		border: 2px outset common.$dark-grey;
	}
	
	&:active {
		border-style: inset;
	}

	transition: all 300ms;
}

</style>