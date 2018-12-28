<template>
	<div>
		<div class="user__list">
			<div class="user__card" v-for="(user, i) in usersList" :key="i">
				<router-link :to="/user/ + user.login">
					<img class="user__avatar" :src="user.avatar_url" alt="User avatar">
					<span class="user__login">{{user.login}}</span>
				</router-link>
			</div>
		</div>
		<Button v-if="!loading" @click="updateList()"/>
		<loader v-if="loading"/>
	</div>
</template>

<script>
import axios from "axios";
import Button from "./shared/Button.vue";

export default {
	name: "ListAllUsers",
	components: { Button },
	data() {
		return {
			loading: true,
			usersList: null,
			nextPage: null,
			newList: null,
			API: "https://api.github.com/users?per_page=50"
		};
	},
	mounted() {
		axios
			.get(this.API)
			.then(res => (this.usersList = res.data))
			.finally(() => (this.loading = false));
	}
};
</script>

<style>
ul {
	list-style-type: none;
	padding: 0;
}

.user__list {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
}

.user__card {
	text-align: center;
	width: 120px;
	margin-bottom: 1em;
	padding: 0.5em;
	transition: all 0.6s ease;
	cursor: pointer;
	border-radius: 0.25em;
}

.user__card:hover {
	background-color: #fa8231dd;
	transform: translateY(-5px);
	box-shadow: 0 8px 8px 2px rgba(0, 0, 0, 0.1);
}

.user__avatar {
	margin: auto;
	display: block;
	width: 100px;
	height: 100px;
	margin-bottom: 0.5em;
	overflow: hidden;
	border-radius: 0.25em;
}
</style>
