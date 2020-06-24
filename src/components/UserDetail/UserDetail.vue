<template>
	<div class="container">
		<loader v-if="loading"/>
		<div class="user__detail" v-if="!loading">
			<div class="user__pic">
				<img :src="userDetail.avatar_url" alt srcset>
			</div>
			<div class="user__data">
				<p>
					<font-awesome-icon class="user__icon" icon="fingerprint"/>
					{{userDetail.id}}
				</p>

				<p>
					<font-awesome-icon class="user__icon" icon="user"/>
					{{userDetail.name}}
				</p>
				<p>
					<font-awesome-icon class="user__icon" icon="id-card"/>
					<a :href="userDetail.html_url" target="_blank">
						{{userDetail.html_url}}
						<font-awesome-icon
							class="user__icon"
							icon="external-link-alt"
							style="margin-left: 0.5em"
						/>
					</a>
				</p>
				<p>
					<font-awesome-icon class="user__icon" icon="calendar-check"/>
					{{userDetail.created_at | dateFormat}}
				</p>
			</div>
		</div>
		<div class="user__repos" v-if="!loading">
			<div class="user__repos__detail" v-for="(repo, i) in userRepos" :key="i">
				<p class="user__repos__name">
					{{repo.name}}
					<span class="user__repos__id">- {{repo.id}}</span>
				</p>
				<p class="user__repos__description">{{repo.description}}</p>
				<p>
					<a :href="repo.html_url" target="_blank" rel="noopener noreferrer">
						{{repo.html_url}}
						<font-awesome-icon
							class="user__icon"
							icon="external-link-alt"
							style="margin-left: 0.5em"
						/>
					</a>
				</p>
			</div>
			<div v-if="links">
				<button @click="prevPage" :disabled="!links['prev']">Previous</button>
				<button @click="nextPage" :disabled="!links['next']">Next</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
  props: ["id"],

  data() {
    return {
      loading: true,
      userDetail: null,
      userRepos: null,
      API: `https://api.github.com/users/${this.id}`,
      API_REPOS: `https://api.github.com/users/${this.id}/repos`,
      userReposLink: null,
      links: null
    };
  },
  mounted() {
    //get user details from API
    axios.get(this.API).then(res => (this.userDetail = res.data));

    //listing user repos
    axios
      .get(this.API_REPOS)
      .then(res => (this.userRepos = res.data))
      .finally(() => (this.loading = false));

    //get links from header
    axios
      .get(this.API_REPOS)
      .then(res => (this.links = parseHeadersLink(res.headers.link)));
  },
  filters: {
    dateFormat(date) {
      return moment(date).format("YYYY/MM/DD");
    }
  },
  methods: {
    nextPage() {
      //updating repos list with repos from the next page
      axios.get(this.links["next"]).then(res => (this.userRepos = res.data));
      axios
        .get(this.links["next"])
        .then(res => (this.links = parseHeadersLink(res.headers.link)));
    },
    prevPage() {
      axios.get(this.links["prev"]).then(res => (this.userRepos = res.data));
      axios
        .get(this.links["prev"])
        .then(res => (this.links = parseHeadersLink(res.headers.link)));
    }
  }
};
</script>

<style>
.user__icon {
  padding-right: 0.5em;
}

.user__data p {
  margin-bottom: 1em;
}
.container {
  padding: 0;
  margin: auto;
  display: flex;
}

.user__detail {
  padding: 1em;
  width: 300px;
  font-size: 0.85em;
}

.user__pic img {
  width: 150px;
  height: 150px;
  border-radius: 0.25em;
  margin-bottom: 1em;
}

.user__repos {
  width: 100%;
}

.user__repos__detail {
  font-size: 0.85em;
  padding: 0.5em;
  transform: translateY(-1px);
  transition: all 0.3s ease;
  border-bottom: 1px solid lightgray;
  word-wrap: break-word;
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

@media screen and (max-width: 978px) {
  .container {
    display: block;
  }

  .user__detail {
    display: flex;
    width: 100%;
  }

  .user__data {
    padding-left: 3em;
  }
}

@media screen and (max-width: 600px) {
  .container {
    display: block;
  }

  .user__detail {
    display: block;
    width: 100%;
  }

  .user__data {
    padding-left: 0em;
  }
}
</style>
