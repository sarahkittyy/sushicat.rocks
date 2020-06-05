<template>
<div class="box">
	<slot />
</div>
</template>

<script>
export default {
	name: 'ContentContainer',
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.box {
	border: 1px solid common.$dark-grey;
	border-radius: 15px;
	
	background-color: common.$grey;
	
	padding: 10px;
}

</style>