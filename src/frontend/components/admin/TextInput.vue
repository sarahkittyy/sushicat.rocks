<template>
<input
	type="password"
	class="text-input"
	v-model="inputData"
	:placeholder="placeholder"
	@keyup.enter="$emit('submit')"
/>
</template>

<script>
export default {
	name: 'TextInput',
	props: {
		placeholder: String,
		value: String,
	},
	computed: {
		inputData: {
			get() {
				return this.value;
			},
			set(v) {
				this.$emit('input', v);
			}
		}
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';
	
.text-input {
	@include common.font-roboto;
	
	border: 2px solid common.$grey;
	border-radius: 8px;

	outline: none;
	padding: 8px;
	
	transition: all 300ms;
	
	&:focus {
		border-color: common.$primary;
	}
}

</style>