<template>
<div class="container">
	<slot />
</div>
</template>

<script>
export default {
	name: 'AppList',
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.container {
	display: flex;

	width: 100%;
	
	justify-content: center;
	
	border: 2px solid 
}

</style>