<template>
<div>
	<input type="text" v-model="inputVal" :placeholder="placeholder" class="input" />
</div>
</template>

<script>
export default {
	name: 'TextInput',
	props: {
		value: String,
		placeholder: String,
	},
	computed: {
		inputVal: {
			get() {
				return this.value;
			},
			set(v) {
				this.$emit('input', v)
			}
		}	
	},
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.input {
	padding: 10px;
	border-radius: 5px;
	border: 2px solid transparent;
	outline: none;
	text-align: center;
	
	transition: all 0.3s;
	
	&:focus {
		border: 2px solid #33ccff;
	}
}

</style>