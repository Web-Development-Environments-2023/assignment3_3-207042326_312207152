<template>
  <div v-if="this.title!=='My Family Recipes'" :isFamilyRes="false">
  <router-link 
    :to="{ name: 'recipe', params: { recipeId: recipe.id, title: title} }"
    class="recipe-preview"
  >
      <!-- <img v-if="image_load" :src="recipe.image" class="recipe-image" /> -->
    <div >
        <b-card
            :img-src="recipe.image"
            img-alt="Image"
            img-top
            style="width: 22rem; height: 34rem; color: rgb(0, 0, 0)"
          >
            <b-card-header
              :header="recipe.title"
              :border-variant="watchedColor"
              :header-border-variant="watchedColor"
              :header-bg-variant="watchedColor"
              style="width: 19.5rem; color: rgb(255, 255, 255)"
            >
            </b-card-header>
            <b-card-body class="recipe-body">
              <b-avatar
                variant="transparent"
                icon="clock"
                size="2em"
              ></b-avatar>
              {{ recipe.readyInMinutes }} minutes |
              <b-avatar
                variant="transparent"
                icon="hand-thumbs-up"
                size="2em"
              ></b-avatar>
              {{ recipe.aggregateLikes }} likes
              <!-- <b-avatar v-if="watched" variant="tra"></b-avatar> -->
            </b-card-body>
            <b-card-body class="recipe-body">
              <b-avatar
                v-if="recipe.vegan"
                variant="tranparent"
                :src="require('@/assets/vegan.png')"
                style="width: 2.5em; height: 3.3em"
              >
              </b-avatar>
              <b-avatar
                v-if="recipe.vegetarian"
                variant="tranparent"
                :src="require('@/assets/vegetarian.png')"
                style="width: 4.5em; height: 3em"
              >
              </b-avatar>
              <b-avatar
                v-if="recipe.glutenFree"
                variant="tranparent"
                :src="require('@/assets/gluten_free.png')"
                style="width: 3.8em; height: 3em"
              >
              </b-avatar>
            </b-card-body>
            <b-card-footer v-if="$root.store.username" class="recipe-footer">
              <!-- <b-card-body class="recipe-body"> -->
                <b-button
                  v-if="!this.favorite"
                  @click="addToFavorite"
                  variant="outline-dark"
                >
                  <b-icon-star></b-icon-star>
                </b-button>

                <b-button v-else variant="outline-success" :disabled="false">
                  <b-icon-star></b-icon-star>
                </b-button>
              <!-- </b-card-body> -->
            </b-card-footer>
        </b-card>
    </div>
  </router-link>
</div>
  <div v-else>
    <div >
      <b-card :style="{ 'background-image': 'url(' + require('@/assets/cover.jpeg') + ')', 'background-size': 'cover',
      'background-position': 'center','min-height':'500px', 'max-width': '500px','margin-right': '20px','margin-bottom': '20px','margin-left': '20px', 
}"
          >
          <b-card-header class="card-content"
            :header="recipe.name"
            :border-variant="watchedColor"
            :header-border-variant="watchedColor"
            :header-bg-variant="watchedColor"
            style="width: 100%; color: rgb(255, 255, 255); padding: 15px;"
          >
          </b-card-header> 
          <b-card-body class="card-content">
            Belong to: {{ recipe.belongTo }}        
            <b-avatar
                variant="transparent"
                :src="require('@/assets/fam.jpg')"
                size="5em"
                style="margin-left: 30px;"
              ></b-avatar> <br>      
            <!-- <b-avatar
                variant="transparent"
                icon="clock"
                size="2em"
              ></b-avatar> -->
            Occation: {{ recipe.occation }}  <br>
            Ingredients: {{ recipe.ingredients }}  
            <br>
            Instructions: 
            <div v-for="(sentence, index) in numberedInstructions(recipe.instructions)" :key="index">
            {{ index + 1 }}. {{ sentence }}
         </div> 
          </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.axios.get(this.recipe.image).then((i) => {
    //   this.image_load = true;
    // });
    // this.axios.get("require('@/assets/RecipeViewPage.jpg')").then((i) => {
    this.image_load = true;
    // });
    
  },
  data() {
    return {
      image_load: false,
      favorite: undefined,
      watchedColor: "dark",
      isFamilyRes:false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    log_in: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true
    }
  },
  async created() {
    console.log(this.title);
    if(!this.isFamilyRes){
      let watched_response = await this.axios.get(
        this.$root.store.server_domain +
          "/recipes/isWatched?recipeId="+
          this.recipe.id+"&username="+this.$root.store.username,
        { withCredentials: true }
      );
      if (watched_response.data == false) {
        console.log("the ans is false");
      }    if (watched_response.data == true) {
        console.log("the ans is true");
        this.watchedColor = "info";
      }

      let favorite_response = await this.axios.get(
        this.$root.store.server_domain +
          "/users/isAFavorites?recipeId="+this.recipe.id+"&username="+this.$root.store.username,
        { withCredentials: true }
      );
      if (favorite_response.data == true) {
        console.log("is fav");
        this.favorite = true;
      }
    }
  },

  methods: {
    async addToFavorite() {
      // const recipe = { recipeId: this.$route.params.recipeId };
      const recipe = { recipeId: this.recipe.id };
      const username = { username: this.$root.store.username };

      let response;
      console.log(recipe);
      console.log(this.$root.store.username);
      try {
        console.log(this.$root.store.username);
        response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            recipeId: recipe.recipeId,
            username: username.username,
            withCredentials: true,
          }
        );

        console.log(this.$root.store.username);

        this.favorite = true;
      } catch (err) {
        console.log(err.response);
        // this.form.submitError = err.response.data.message;
      }
    },
    numberedInstructions(instruction) {
      const sentences = instruction.split('.');
      return sentences.filter(Boolean); // Remove empty strings
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  position: relative;
  margin: 10px 10px;
}.recipe-preview .recipe-footer {
  background: white;
  height: 5rem;
  width: 20rem;
  overflow: hidden;
  border: 0ch;
  padding: 20px;
}

.recipe-preview .recipe-body {
  width: 20rem;
  height: 4rem;
  position: relative;
  padding: 5px;
}
.recipe-preview{
  display: inline-block;
  /* width: 90%;
  height: 100%; */
  position: relative;
  margin: 20px; 
}
.card-content {
  text-align: center;
  margin-bottom: 1px;
  margin-top: 1px;
  padding: 20px;
}

</style>
