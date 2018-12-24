<template>
	<div class="hello">
		<ul>
			<li v-for="(user, i) in usersList" :key="i">
				<div class="user__card">
					<img class="user__avatar" :src="user.avatar_url" alt="User avatar">
					<span class="user__login">{{user.login}}</span>
				</div>
			</li>
		</ul>
		<ButtonLoadMore/>
	</div>
</template>

<script>
import axios from "axios";
import ButtonLoadMore from "./ButtonLoadMore/ButtonLoadMore.vue";

export default {
	name: "ListAllUsers",
	props: {},
	data() {
		return {
			usersList: null,
			nextPage: null,
			API: "https://api.github.com/users"
		};
	},
	components: { ButtonLoadMore },
	mounted() {
		axios.get(this.API).then(res => (this.usersList = res.data));
	}
};
</script>

<style>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}

.user__card {
	margin: 0.5em;
	padding: 0.25em;
	transition: all 0.6s ease;
	cursor: pointer;
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
}

.user__login {
	color: gray;
}
</style>
