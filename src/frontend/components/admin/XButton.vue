<template>
<button @click="$emit('click')" class="x-button">X</button>
</template>

<script>
export default {
	name: 'XButton',
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.x-button {
	outline: none;
	background: none;
	border: none;
	
	font-size: 18pt;
	
	&:hover {
		text-decoration: underline;
	}
	
	&:active {
		font-weight: 800;
	}
}

</style>