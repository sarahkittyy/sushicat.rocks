<template>
<div :class="classList">
	<h2>{{ heading }}</h2>
	<ul>
		<slot />
	</ul>
</div>
</template>

<script>
export default {
	name: 'AppList',
	props: {
		heading: String,
		textOnly: Boolean,
	},
	computed: {
		classList() {
			return 'list-content' + (this.textOnly ? '' : ' border');
		}
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.list-content {
	@include common.font-comic-sans;
	
	display: flex;

	width: 100%;
	height: 100%;
	
	text-align: center;
	justify-content: center;
	
	flex-direction: column;
	
	.border {
		border: 1px solid black;
		background-color: common.$grey;
		
		border-radius: 20px;
		margin: 30px;

		@media (max-width: common.$small-width) {
			margin: 0px;
			
			margin-top: 20px;
		}
	}
	
	* {
		flex: 1;
	}
	
	ul {
		flex: 3;
		text-align: left;
	}
}

</style>