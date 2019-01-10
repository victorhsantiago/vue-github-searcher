<template>
	<div>
		<div class="user__list">
			<div class="user__card" v-for="(result, i) in searchResults" :key="i">
				<router-link :to="/user/ + result.login">
					<img class="user__avatar" :src="result.avatar_url" alt="User avatar">
					<span class="user__login">{{result.login}}</span>
				</router-link>
			</div>
		</div>
		<button v-if="!loading" @click="updateList()">Load more</button>
		<loader v-if="loading"/>
	</div>
</template>

<script>
import axios from "axios";
export default {
	props: ["user"],
	data() {
		return {
			loading: true,
			searchResults: null,
			API: `https://api.github.com/search/users?q=${this.user}`
		};
	},
	mounted() {
		axios
			.get(this.API)
			.then(res => (this.searchResults = res.data.items))
			.finally(() => (this.loading = false));
	}
};
</script>

<style>
</style>
