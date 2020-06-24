<template>
	<div class="header__container">
		<router-link class="home__link" to="/" active-class="active" exact>Home</router-link>
		<div class="search__field">
			<input
				type="text"
				placeholder="username"
				v-model.trim="user"
				v-on:keyup.enter="SearchResults"
			>
			<button @click="SearchResults">
				<font-awesome-icon icon="search"/>
			</button>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  methods: {
    SearchResults() {
      this.$router.push(`/search-result/${this.user}`);
      this.user = "";
    }
  }
};
</script>

<style scope>
.header__container {
  width: 100%;
  margin-bottom: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.home__link {
  align-self: center;
}

.search__field {
  justify-self: end;
}

.search__field input {
  border: 0;
  padding: 0.75em;
  font-size: 1.25em;
}
</style>

