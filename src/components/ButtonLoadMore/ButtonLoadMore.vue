<template>
	<div id="ButtonLoadMore">
		<button>{{title}}</button>
	</div>
</template>

<script>
export default {
	name: "ButtonLoadMore",
	data() {
		return {
			title: "Load more"
		};
	}
};
</script>

<style>
button {
	font-size: 1em;
	padding: 1em;
	background-color: #f0f0f0;
	border: none;
	outline: none;
	cursor: pointer;
	transition: all 0.6s ease;
}

button:hover {
	background-color: #fa8231dd;
}
</style>
