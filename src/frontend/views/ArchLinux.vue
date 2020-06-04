<template>
<div class="arch-container font-cp437">
	<div id="terminal">
		<span v-for="n in 100">
			hi <br />
		</span>
	</div>
</div> 
</template>

<script>
export default {
	name: 'ArchLinux',
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.arch-container {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	
	font-size: 22px;
	
	justify-content: center;
	
	background-color: black;
	
	#terminal {
		color: #ccc;
		overflow-y: scroll;
		width: 90%;
		margin-top: 5%;
		margin-bottom: 5%;
		
		scrollbar-width: thin;
		scrollbar-color: common.$dark-grey common.$grey;
		
		&::-webkit-scrollbar {
			width: 8px;
		}
		&::-webkit-scrollbar-track {
			background: black;
		}
		&::-webkit-scrollbar-thumb {
			background-color: common.$dark-grey;
			border-radius: 10px;
			border: 1px solid common.$grey;
		}
	}
}

</style>