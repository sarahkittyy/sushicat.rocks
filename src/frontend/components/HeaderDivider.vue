<template>
<div class="header" :style="{ height }">
	<slot />
</div>
</template>

<script>
export default {
	name: 'HeaderDivider',
	props: { height: String, },
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.header {
	@include common.font-comic-sans;
	
	width: 100%;
	
	text-align: center;
	border-bottom: 1px solid black;
	padding-top: 10px;
	padding-bottom: 10px;
}

</style>