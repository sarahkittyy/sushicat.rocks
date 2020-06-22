<template>
<div>

	<vue-snotify />
</div>
</template>

<script>
import io from 'socket.io-client';

export default {
	name: 'NyoomCars',
	data: () => ({
		$socket: null,
	}),
	created() {
		document.title = 'nyoom cars o3o';
		
		this.$socket = io.connect('/nyoom');
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>