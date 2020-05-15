<template>
<button @click="$emit('click')" class="simple-button">
	<slot />
</button> 
</template>

<script>
export default {
	name: 'SimpleButton',
};
</script>

<style lang="scss" scoped>

@import '../styles/common.scss';

.simple-button {
	background-color: #aaa;
	border: 2px solid black;
	border-radius: 12px;
	text-align: center;
	outline: none;
	
	&:hover {
		background-color: #999;
	}
	
	&:active {
		background-color: #888;
	}
}

</style>