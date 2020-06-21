<template>
<div class="password-box">
	<p>Password</p>
	<text-input
		v-model="password"
		placeholder="Password"
		@submit="$emit('submit')"
	/>
</div>	
</template>

<script>
import TextInput from '~/admin/TextInput';

export default {
	name: 'PasswordInput',
	data: () => ({
	}),
	components: {
		TextInput
	},
	props: {
		value: String
	},
	computed: {
		password: {
			get() {
				return this.value;
			},
			set(v) {
				this.$emit('input', v);
			}
		}
	},
	created() {
		this.$store.dispatch('checkAdmin')
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.password-box {
	@include common.font-roboto;
	
	display: inline-flex;
	padding: 20px;
	
	flex-basis: content;
	
	justify-content: center;
	align-items: center;

	flex-direction: column;
	
	border: 2px solid black;
	background-color: common.$grey;
	border-radius: 15px;
	
	p {
		text-align: center;
	}
}

</style>