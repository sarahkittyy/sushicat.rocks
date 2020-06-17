<template>
<div>
	<template v-if="entered">
		
	</template>
	<template v-else>
		
	</template> 
</div> 
</template>

<script>
export default {
	name: 'WhyAreYouHere',
	data: () => ({
		intervals: [],
		entered: false,
	}),
	created() {
		let titles = [
			'aaaaaaaaaaaaa',
			'ur valid',
			'SONsHIE CATE',
			'lsdkjfklsdjflskdjlaskjdldskjfsldkf',
			'^w^',
			'do u ever just',
			'awah',
		];
		this.intervals.push(setInterval(() => {
			document.title = titles[Math.floor(Math.random() * titles.length)];
		}, 2000));
	},
	destroyed() {
		this.intervals.forEach(i => clearInterval(i));
	}
};
</script>

<style lang="scss" scoped>

</style>