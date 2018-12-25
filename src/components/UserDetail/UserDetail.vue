<template>
	<div>
		<span>Detalhes {{userDetail}}</span>
		<button @click="goToHome">Home</button>
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: ["login"],
	data() {
		return {
			userDetail: null,
			API: "https://api.github.com/users/" + this.login
		};
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		}
	},
	mounted() {
		axios.get(this.API).then(res => (this.userDetail = res.data));
	}
};
</script>

<style>
</style>
