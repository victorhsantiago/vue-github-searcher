<template>
	<div id="app">
		<Header></Header>
		<transition name="fade">
			<router-view></router-view>
		</transition>
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
	color: #2c3e50;
	width: 80%;
	margin: auto;
	margin-top: 60px;
}

a {
	text-decoration: none;
	color: #2c3e50;
}

a:hover {
	color: #121d29;
	text-decoration: underline;
}

.fade-enter {
	opacity: 0;
}
.fade-enter-active {
	transition: opacity 1s;
}
.fade-leave {
	/* opacity: 1; */
}
.fade-leave-active {
	transition: opacity 1s;
	opacity: 0;
}
</style>
