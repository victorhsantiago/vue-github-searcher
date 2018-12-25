<template>
	<div id="app">
		<Header></Header>
		<router-view></router-view>
	</div>
</template>

<script>
import Header from "./components/shared/Header.vue";

export default {
	name: "app",
	components: {
		Header
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
