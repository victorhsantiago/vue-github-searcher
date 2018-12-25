<template>
	<div>
		<div>
			<img :src="userDetail.avatar_url" alt srcset>
		</div>
		<div>
			<ul>
				<li>ID: {{userDetail.id}}</li>
				<li>Login: {{userDetail.login}}</li>
				<a :href="userDetail.html_url" target="_blank">
					<li>Profile: {{userDetail.html_url}}</li>
				</a>
				<li>Member since: {{userDetail.created_at}}</li>
			</ul>
			<ul>
				<li v-for="(repo, i) in userRepos" :key="i">
					<span>{{repo.name}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: ["id"],
	data() {
		return {
			userDetail: null,
			userRepos: null,
			API: "https://api.github.com/users/" + this.id,
			API_REPOS: "https://api.github.com/users/" + this.id + "/repos"
		};
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		}
	},
	mounted() {
		axios.get(this.API).then(res => (this.userDetail = res.data));
		axios.get(this.API_REPOS).then(res => (this.userRepos = res.data));
	}
};
</script>

<style>
</style>
