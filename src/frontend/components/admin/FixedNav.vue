<template>
<div class="nav-container">
	<div class="nav-item-box">
		<span
			v-for="link in links"
			class="nav-item"
			:selected="link.text === selected"
			@click="selectedLink = link.text"
		>
			<p>{{ link.text }}</p>
		</span>
	</div>
</div>
</template>

<script>
export default {
	name: 'FixedNav',
	props: {
		links: {
			type: Array,
			default: []
		},
		selected: {
			type: String,
			required: true
		},
	},
	methods: {
	},
	computed: {
		selectedLink: {
			get() {
				return this.selected;
			},
			set(s) {
				this.$emit('update', s);
			}
		},
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.nav-container {
	@include common.font-roboto;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	position: sticky;
	top: 0;
	left: 0;
	
	padding: 0;
	margin: 0;
	
	width: 100%;
	
	text-align: center;
	
	background: linear-gradient(0, common.$primary, common.$primary-alt);
	border-bottom: 2px solid black;
}

.nav-item-box {
	display: flex;
	
	border-left: 1px solid black;

	height: 100%;
	margin: 0;
	padding: 0;
	
	flex-direction: row;
	
	justify-content: center;
	align-items: center;
}

.nav-item {
	padding-top: 5px;
	padding-bottom: 5px;
	padding-left: 10px;
	padding-right: 10px;
	border-right: 1px solid black;
	
	background: linear-gradient(0, common.$primary, common.$primary-alt);

	text-align: center;
	
	font-size: 12pt;
	
	width: 100px;
	
	&:hover {
		background: linear-gradient(180deg, common.$primary, common.$primary-alt);
	}
	
	&[selected] {
		background:
			linear-gradient(
				180deg, 
				darken(common.$primary, 10%), 
				darken(common.$primary-alt, 10%));
	}
	
	&:active {
		background:
			linear-gradient(
				180deg, 
				darken(common.$primary, 20%), 
				darken(common.$primary-alt, 20%));
	}
}

</style>