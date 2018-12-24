<template>
	<div id="app">
		<ListAllUsers/>
	</div>
</template>

<script>
import ListAllUsers from "./components/ListAllUsers.vue";

export default {
	name: "app",
	components: {
		ListAllUsers
	}
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
