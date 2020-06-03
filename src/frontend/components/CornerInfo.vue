<template>
<div class="fixed-bottom-left grey-box">
	<slot />
</div>
</template>

<script>
export default {
	name: 'CornerInfo'
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.fixed-bottom-left {
	position: fixed;
	left: 0;
	bottom: 0;
	margin: 0;
	padding: 5px;
	z-index: 1;
}

.grey-box {
	background-color: #999;
	border-top-right-radius: 10px;
	border: 2px solid black;
	border-bottom: none;
	border-left: none;
}

</style>