<template>
<div class="header font-comic-sans" :style="{ height }">
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

@import '../styles/common.scss';

.header {
	width: 100%;
	
	text-align: center;
	border-bottom: 1px solid black;
	padding-top: 10px;
	padding-bottom: 10px;
}

</style>