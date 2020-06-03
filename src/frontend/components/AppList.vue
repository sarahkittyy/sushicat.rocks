<template>
<div class="list-content font-comic-sans">
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
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.list-content {
	display: flex;

	width: 100%;
	
	text-align: center;
	justify-content: center;
	
	flex-direction: column;
	
	border: 1px solid black;
	background-color: common.$grey;
	
	border-radius: 20px;
	
	margin: 30px;
	
	@media (max-width: 520px) {
		margin: 0px;
		
		margin-top: 20px;
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