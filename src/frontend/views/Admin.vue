<template>
<div>
	<div id="bg" />
	<div v-if="admin">
		<fixed-nav :selected="selectedNav" @update="selectedNav = $event" :links="links" />

		<div v-if="selectedNav === 'Home'" class="home">
			<span id="logo"><img src="/assets/logo.png" /></span>
		</div>

		<div v-if="selectedNav === 'Pats'" class="pats">
			<pat-table id="pat-table" />
		</div>

		<div v-if="selectedNav === 'Leave'">
			{{ leave() }}
		</div>
		
		<div v-if="selectedNav === 'Logout'">
			{{ logout() }}
		</div>

	</div>
	<div v-else class="center-content">
		<password-input v-model="password" @submit="submitPassword" />
	</div>
	
	<vue-snotify />
</div>
</template>

<script>
import PasswordInput from '~/admin/PasswordInput'; 
import FixedNav from '~/admin/FixedNav';
import PatTable from '~/admin/PatTable';

import { mapGetters } from 'vuex';

export default {
	name: 'Admin',
	data: () => ({
		password: '',
		links: [
			{ text: 'Home' },
			{ text: 'Pats' },
			{ text: 'Leave' },
			{ text: 'Logout' },
		],
		selectedNav: 'Home',
	}),
	methods: {
		submitPassword() {
			this.$store.dispatch('adminLogin', { password: this.password });
		},
		logout() {
			this.$store.dispatch('adminLogout');
			this.$router.push('/home');
		},
		leave() {
			this.$router.push('/home');
		}
	},
	computed: {
		...mapGetters(['admin']),
	},
	components: {
		PasswordInput,
		FixedNav,
		PatTable,
	},
	created() {
		this.$store.dispatch('adminCheckStatus');
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.home {
	#logo {
		display: flex;

		text-align: center;
		justify-content: center;
		align-items: center;
		
		img {
			max-height: 140px;
		}
	}
}

.pats {
	display: flex;
	width: 100%;
	
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	#pat-table {
		margin: 15px;
	}
}

#bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	
	background:
		rgba(0,0,0,0.4) url('/assets/adminbg.jpg');
	background-blend-mode: darken;
	background-size: cover;
	
	z-index: -99999;
}

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