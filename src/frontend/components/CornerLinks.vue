<template>
<div class="fixed-bottom-left grey-box smooth-scaling">
	<slot />
</div>
</template>

<script>
export default {
	name: 'CornerLinks'
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

.smooth-scaling {
	transition: all 200ms;
	* {
		transition: all 200ms;
		max-width: 32px;
		
		&:hover {
			max-width: 38px;
		}
		
		&:active {
			max-width: 36px;
		}
		
		transition: all 200ms;
	}
}

</style>