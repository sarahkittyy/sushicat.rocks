<template>
<div>
	<input type="checkbox" class="checkbox" id="toggle" v-model="inputVal" />
	<label for="toggle" class="switch" />
</div>
</template>

<script>
export default {
	name: 'ToggleSwitch',
	props: {
		value: Boolean,
	},
	computed: {
		inputVal: {
			get() {
				return this.value;
			},
			set(v) {
				this.$emit('input', v);
			}
		}
	},
};
</script>

<style lang="scss" scoped>

@import '~@/common';

$width: 40px;
$height: $width / 2;

.switch {
	position: relative;
	display: inline-block;

	width: $width;
	height: $height;
	
	background-color: #aaa;
	
	border-radius: $height;
	
	&::after {
		content: '';
		position: absolute;

		width: $height - 2px;
		height: $height - 2px;

		border-radius: 50%;
		background-color: white;
		top: 1px;
		left: 1px;
		
		transition: all 0.3s;
	}
}

.checkbox {
	display: none;
}

.checkbox:checked + .switch {
	background-color: #33ccff;
}

.checkbox:checked + .switch::after {
	left: $width / 2;
}

</style>