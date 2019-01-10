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
		<div v-if="links">
			<button @click="prevPage" :disabled="!links['prev']">Previous</button>
			<button @click="nextPage" :disabled="!links['next']">Next</button>
		</div>
		<loader v-if="loading"/>
	</div>
</template>

<script>
import axios from "axios";

function parseHeadersLink(header) {
	if (header.length === 0) {
		throw new Error("input must not be of zero length");
	}

	// Split parts by comma
	let parts = header.split(",");
	let links = {};

	// Parse each part into a named link
	for (let i = 0; i < parts.length; i++) {
		let section = parts[i].split(";");
		if (section.length !== 2) {
			throw new Error("section could not be split on ';'");
		}
		let url = section[0].replace(/<(.*)>/, "$1").trim();
		let name = section[1].replace(/rel="(.*)"/, "$1").trim();
		links[name] = url;
	}

	return links;
}

export default {
	props: ["user"],
	data() {
		return {
			loading: true,
			searchResults: null,
			API: `https://api.github.com/search/users?q=${this.user}`,
			userReposLink: null,
			links: null
		};
	},
	mounted() {
		axios
			.get(this.API)
			.then(res => (this.searchResults = res.data.items))
			.finally(() => (this.loading = false));

		axios
			.get(this.API)
			.then(res => (this.links = parseHeadersLink(res.headers.link)));
	},
	methods: {
		nextPage() {
			//updating repos list with repos from the next page
			axios
				.get(this.links["next"])
				.then(res => (this.searchResults = res.data.items));
			axios
				.get(this.links["next"])
				.then(res => (this.links = parseHeadersLink(res.headers.link)));
		},
		prevPage() {
			axios
				.get(this.links["prev"])
				.then(res => (this.searchResults = res.data.items));
			axios
				.get(this.links["prev"])
				.then(res => (this.links = parseHeadersLink(res.headers.link)));
		}
	}
};
</script>

<style>
</style>
