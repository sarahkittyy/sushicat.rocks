<template>
<div>
	<div v-if="admin">
		
	</div>
	<div v-else class="center-content">
		<password-input v-model="password" @submit="submitPassword" />
	</div>
	
	<vue-snotify />
</div>
</template>

<script>
import PasswordInput from '~/admin/PasswordInput'; 

import { mapGetters } from 'vuex';

export default {
	name: 'Admin',
	data: () => ({
		password: ''
	}),
	methods: {
		submitPassword() {
			this.$store.dispatch('adminLogin', { password: this.password });
		},
		logout() {
			this.$store.dispatch('adminLogout');
		}
	},
	computed: {
		...mapGetters(['admin']),
	},
	components: {
		PasswordInput
	},
	created() {
		this.$store.dispatch('adminCheckStatus');
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.center-content {
	display: flex;
	
	overflow: hidden;
	height: 100vh;
	
	text-align: center;
	
	* {
		margin: auto;
	}
}

</style>