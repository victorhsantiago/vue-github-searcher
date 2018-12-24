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
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,700");

:root {
	font-family: "Montserrat", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#app {
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
