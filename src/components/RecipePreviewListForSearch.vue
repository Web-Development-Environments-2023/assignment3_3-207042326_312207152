<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <div v-if="no_results">
      <h4>There is no results ☹️</h4>
    </div>
    <div v-else>
      <b-row>
        <b-row v-for="r in recipes" :key="r.id">
          <RecipePreview
            class="recipePreview"
            :recipe="r"
            :log_in="log_in"
            :title="title"
          />
        </b-row>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    log_in: {
      type: Boolean,
      required: false,
      default: false,
    },
    searched: {
      type: Number,
      required: false,
    },
    query: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
    cuisine: {
      type: String,
      required: false,
    },
    diet: {
      type: String,
      required: false,
    },
    intolerance: {
      type: String,
      required: false,
    },
    sortby: {
      type: String,
      required: false,
    },
  },

  watch: {
    searched: {
      handler() {
        console.log("in watch");
        if (this.searched > 0) {
          console.log("in searched function");
          this.updateRecipes();
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      recipes: [],
      no_results: false,
    };
  },

  created() {
    this.updateRecipes();
  },

  // mounted() {
  //   if (this.searched > 0) {
  //     console.log("in mounted");
  //     this.updateRecipes();
  //   }
  // },

  methods: {
    async updateRecipes() {
      console.log("in updateRecipes");
      console.log(this.searched);
      try {
        if (this.title == "Explore This Recipes") {
          await this.randomRecipes();
        } else if (this.title == "Last Viewed Recipes") {
          await this.lastViewedRecipes();
        } else if (this.title == "My Favorite Recipes") {
          await this.favoriteRecipes();
        } else if (this.title == "My Recipes") {
          await this.myRecipes();
        } else if (this.title == "Search Results") {
          await this.searchRecipes();
        } else if (this.title == "Last Search") {
          await this.LastSearch();
        }
      } catch (error) {
        console.log(error);
      }
    },

    async randomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random"
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async lastViewedRecipes() {
      try {
        let response;
        let returned_recipes = [];

        console.log(this.$root.store.server_domain + "/recipes/watched");

        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/watched",
          { withCredentials: true }
        );

        console.log(response);

        if (response == []) {
          this.no_results = true;
        } else {
          returned_recipes = response.data;
          this.recipes = [];
          this.recipes.push(...returned_recipes);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async favoriteRecipes() {
      try {
        let response;
        let returned_recipes;

        console.log(this.$root.store.server_domain + "/user/favorites");

        response = await this.axios.get(
          this.$root.store.server_domain + "/user/favorites",
          { withCredentials: true }
        );

        console.log(response);

        if (response == []) {
          this.no_results = true;
        } else {
          returned_recipes = response.data;
          this.recipes = [];
          this.recipes.push(...returned_recipes);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async myRecipes() {
      try {
        let response;
        let returned_recipes;

        response = await this.axios.get(
          this.$root.store.server_domain + "/user/myRecipes",
          { withCredentials: true }
        );

        console.log(response);

        if (response.data.length == 0) {
          this.no_results = true;
        } else {
          returned_recipes = response.data;
          this.recipes = [];
          this.recipes.push(...returned_recipes);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async searchRecipes() {
      console.log("in searchRecipes");
      try {
        let response;
        let returned_recipes;
        console.log(
          this.$root.store.server_domain +
            "/recipes/search?searchQuery=" +
            this.query +
            "&number=" +
            this.number +
            "&cuisine=" +
            this.cuisine +
            "&diet=" +
            this.diet +
            "&intolerances=" +
            this.intolerances
        );

        response = await this.axios.get(
          this.$root.store.server_domain +
            "/recipes/search?searchQuery=" +
            this.query +
            "&number=" +
            this.number +
            "&cuisine=" +
            this.cuisine +
            "&diet=" +
            this.diet +
            "&intolerances=" +
            this.intolerances
        );

        returned_recipes = response.data;

        console.log(response.data);

        if (returned_recipes == "There is no results!") {
          this.no_results = true;
        } else {
          this.recipes = [];
          this.recipes.push(...returned_recipes);

          if (this.sortby == "aggregateLikes") {
            this.recipes = this.recipes.sort(
              (a, b) => a.aggregateLikes - b.aggregateLikes
            );
          } else if (this.sortby == "readyInMinutes") {
            this.recipes = this.recipes.sort(
              (a, b) => a.readyInMinutes - b.readyInMinutes
            );
          }
        }
        this.$root.store.setLastSearch(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    LastSearch(){
      this.recipes = [];
      console.log(this.$root.store.lastSearch);
      this.recipes = this.$root.store.lastSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
