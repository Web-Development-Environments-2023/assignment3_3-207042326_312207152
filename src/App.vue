
<template>
  <div id="app">
    <b-navbar class="navbar navbar-light fixed-top" type="dark" style="background-color: rosybrown">
      <b-navbar-nav>
        <b-nav-item href="#" type="dark">
          <!-- <router-link :to="{ name: 'main' }">Main</router-link> -->
          <b-link :to="{ name: 'main' }" style="color:rgb(238, 209, 209)">Main</b-link>
        </b-nav-item>
        <b-nav-item>
          <!-- <router-link :to="{ name: 'search' }">Search</router-link> -->
          <b-link :to="{ name: 'search' }" style="color:rgb(238, 209, 209)">Search</b-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="$root.store.username" id="loggedInUser">
        <b-nav-item v-b-modal.add-recipe-modal> Create New Recipe </b-nav-item>
        <NewRecipeModal />
        <b-nav-item-dropdown type="dark" variant="light" text="Personal">
          <b-dropdown-item href="#" id="favorites">
            <router-link :to="{ name: 'myfavoriterecipes' }">
              My Favorite Recipes
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item id="myRecipes">
            <router-link :to="{ name: 'myrecipes' }">My Recipes</router-link>
          </b-dropdown-item>
          <b-dropdown-item id="familyRecipes">
            <router-link :to="{ name: 'myfamilyrecipes' }">My Family Recipes</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item>
            Hello {{ $root.store.username }}
        </b-nav-item>
        <b-nav-item @click="Logout">
            Logout
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-else>
        <b-nav-item>
            Hello Guest            
        </b-nav-item>
        <b-nav-item>
          <b-link :to="{ name: 'register' }" style="color:rgb(238, 209, 209)">Register</b-link>
        </b-nav-item>
        <b-nav-item>
          <b-link :to="{ name: 'login' }" style="color:rgb(238, 209, 209)">Login</b-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item>
          <b-link :to="{ name: 'about' }" style="color:rgb(238, 209, 209)">About</b-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import NewRecipeModal from "./components/NewRecipeModal";
export default {
  name: "App",
  components: { NewRecipeModal },
  methods: {
    async Logout() {
      console.log("start logout 3-3");
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Logout"
        );
        this.$root.store.logout();
        if (response.message == "logout succeeded") {
          this.$root.toast("Logout", "User logged out successfully", "success");
          this.$router.push("/").catch(() => {
            this.$forceUpdate();
          });
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4f3852;
  min-height: 150vh;
  background-image: url("@/assets/appBackground.jpg");
  min-width: 100vw;
  background-size: cover; /* Make the image cover the entire container */
  background-repeat: repeat-y; /* Make the image repeat vertically when scrolling down */
  background-attachment: repeat-y; /* Allow the background image to scroll*/
}

#nav {
  padding: 30px;
}
</style>
