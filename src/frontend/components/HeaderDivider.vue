<template>
<div class="header">
	<h1 class="font-comic-sans"><slot /></h1>
</div>
</template>

<script>
export default {
	name: 'HeaderDivider',
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

.header {
	width: 100%;
	text-align: center;
	border-bottom: 1px solid black;
	padding-top: 20px;
	padding-bottom: 20px;
}

</style>