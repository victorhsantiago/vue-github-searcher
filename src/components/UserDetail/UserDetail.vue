<template>
	<div class="container">
		<Loader v-if="loading"/>
		<div class="user__detail" v-if="!loading">
			<div class="user__pic">
				<img :src="userDetail.avatar_url" alt srcset>
			</div>
			<div class="user__data">
				<p>ID: {{userDetail.id}}</p>
				<p>Login: {{userDetail.login}}</p>
				<p>
					Profile:
					<a :href="userDetail.html_url" target="_blank">{{userDetail.html_url}}</a>
				</p>
				<p>Member since: {{userDetail.created_at | dateFormat}}</p>
			</div>
		</div>
		<div class="user__repos">
			<div class="user__repos__detail" v-for="(repo, i) in userRepos" :key="i">
				<p class="user__repos__name">
					{{repo.name}}
					<span class="user__repos__id">- {{repo.id}}</span>
				</p>
				<p class="user__repos__description">{{repo.description}}</p>
				<p>
					<a :href="repo.html_url" target="_blank" rel="noopener noreferrer">{{repo.html_url}}</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Loader from "../shared/Loader.vue";

export default {
	props: ["id"],
	components: { Loader },

	data() {
		return {
			loading: true,
			userDetail: null,
			userRepos: null,
			API: "https://api.github.com/users/" + this.id,
			API_REPOS: "https://api.github.com/users/" + this.id + "/repos"
		};
	},
	mounted() {
		axios.get(this.API).then(res => (this.userDetail = res.data));
		axios
			.get(this.API_REPOS)
			.then(res => (this.userRepos = res.data))
			.finally(() => (this.loading = false));
	},
	filters: {
		dateFormat(date) {
			return moment(date).format("YYYY/MM/DD");
		}
	}
};
</script>

<style>
p {
	padding: 0;
	margin: 0 0 0.5em 0;
}
.container {
	padding: 0;
	margin: auto;
	display: flex;
}

.user__detail {
	padding: 1em;
	width: 25%;
	font-size: 0.85em;
}

.user__pic img {
	width: 150px;
	height: 150px;
	border-radius: 0.25em;
	margin-bottom: 1em;
}

.user_data {
	align-items: center;
}

.user__repos {
	float: right;
}

.user__repos__detail {
	font-size: 0.85em;
	padding: 0.5em;
	transform: translateY(-1px);
	transition: all 0.3s ease;
	border-bottom: 1px solid lightgray;
}

.user__repos__detail:hover {
	background-color: rgba(0, 0, 0, 0.1);
}

.user__repos__name {
	font-size: 1em;
	font-weight: 700;
}

.user__repos__id {
	font-size: 0.65em;
	color: gray;
	font-weight: 400;
}

.user__repos__description {
	font-size: 0.85em;
	color: gray;
	font-weight: 400;
}
</style>
