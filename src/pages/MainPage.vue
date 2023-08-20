<template>
    <!-- @submit.prevent="onRandonRecipes" -->
  <div class="container main-page" style="padding-top: 80px;" id="mainPageId">
    <h1 class="title">Main Page</h1>
    <div class="right-div">
    <RecipePreviewList ref="RecipePreviewListRef" title="Explore This Recipes" :log_in="Boolean($root.store.username)" class="RandomRecipes center" />
    <b-button @click="addToFavoriteHandler" variant="outline-dark" class="btn btn-info mx-auto w-30">
    Random</b-button>
    </div>
    <br>
    <div class="left-div">
    <RecipePreviewList v-if="$root.store.username"
        title="Last Viewed Recipes" 
        :log_in="Boolean($root.store.username)" 
        :class="{RandomRecipes: true,blur:!$root.store.username,center: true}"
      disabled
    ></RecipePreviewList>
    <div v-else class="center-container">
    <router-link  :to="{ name: 'login' }" class="btn btn-primary mx-auto w-30">Login</router-link>
    </div>
    </div>
    
    <div
      style="
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    ></div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      rerandom: false,
    };
  },
  methods: {
    onRandonRecipes() {
      if (this.rerandom) {
        this.rerandom = false;
      } else {
        this.rerandom = true;
      }
    },
    addToFavoriteHandler() {
      console.log("rendom again");
      this.$refs.RecipePreviewListRef.randomRecipes();
    }
  },
};
</script>

<style lang="scss" scoped>

.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.right-div {
  float: right;
}

.left-div {
  float: left;
}


</style>
