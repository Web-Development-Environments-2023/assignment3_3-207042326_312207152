<template>
  <div class="container" id="searchId">
    <h1 class="title" style="color:4f3852; text-shadow: 0 0 2px white;">Search Page</h1>
    <b-navbar toggleable="lg" type="light" style="margin: 10px; background-color:#FAF9F6;" >
      <b-navbar-nav>
        <b-nav-form @submit.prevent="onSearch" @reset.prevent="onReset"> 
          <b-form-input
            variant="outline-secondary"
            class="mr-sm-2"
            placeholder="Your search"
            type="text"
            v-model="query"
            @change="onChangeQuery"
          ></b-form-input>
        </b-nav-form>
        <!--  @keyup.enter="onChangeQuery" -->
        <b-nav-item-dropdown
          text="Number of search results" 
          @submit.prevent="onSearch"
          @reset.prevent="onReset"
          style="font-family:  sans-serif; font-weight: bold;"
        >
          <b-dropdown-item
            v-for="(num, key) in numbers"
            :key="key"
            @click="number = num"
          >
         {{ num }} 
          </b-dropdown-item>
          
        </b-nav-item-dropdown>
       
       

        <b-nav-item-dropdown
          text="Diet"
          @submit.prevent="onSearch"
          @reset.prevent="onReset"
          style="font-family:  sans-serif; font-weight: bold;"
        >
          <b-dropdown-item
            v-for="(d, key) in diets"
            :key="key"
            @click="form.diet = d"
          >
            {{ d }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
         <b-nav-item-dropdown
            text="Cuisine"
            @submit.prevent="onSearch"
            @reset.prevent="onReset"
            style="font-family:  sans-serif; font-weight: bold;"
          >
            <b-dropdown-item
              v-for="(cus, key) in cuisines"
              :key="key"
              @click="form.cuisine = cus"
            >
              {{ cus }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        <b-nav-item-dropdown
          text="Intolerances"
          @submit.prevent="onSearch"
          @reset.prevent="onReset"
          style="font-family:  sans-serif; font-weight: bold;"
        >
          <b-dropdown-item
            v-for="(into, key) in intoleranceses"
            :key="key"
            @click="form.intolerances = into"
          >
            {{ into }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown
          text="Sort by"
          @submit.prevent="onSearch"
          @reset.prevent="onReset"
          style="font-family:  sans-serif; font-weight: bold;"
        >
          <b-dropdown-item
            href="#"
            :variant="this.sort_time"
            @click="sortBy('time')"
            > Preparation time</b-dropdown-item
          >
          <b-dropdown-item
            href="#"
            :variant="this.sort_popularity"
            @click="sortBy('popularity')"
            >Popularity</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-form @submit.prevent="onSearch" @reset.prevent="onReset">
          <b-button
            variant="primary"
            
            class="my-2 my-sm-0"
            type="submit"
            @click="onSearch"
          >Search 
           
         
            
          </b-button>
          <b-button
            variant="warning"
            class="my-2 my-sm-0"
            type="reset"
            @click="onReset"
            >Reset
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    
    <div v-if="searched >0">
      <RecipePreviewList
        title="Search Results"
        :log_in="Boolean($root.store.username)"
        :searched="searched"
        :query="query"
        :number="number"
        :cuisine="form.cuisine"
        :diet="form.diet"
        :intolerance="form.intoleranceses"
        :sort="sortby"
      />
    </div>
    <div v-else-if="$root.store.lastSearch">
      <RecipePreviewList
        title="Last Search"
        :log_in="Boolean($root.store.username)"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewListForSearch";
import diets from "../assets/diet";
import numbers from "../assets/numbers";
import cuisines from "../assets/cuisines";
import intoleranceses from "../assets/intoleranceses";



export default {
  name: "SearchPage",
  components: {
    RecipePreviewList,
  },

  data() {
    return {
      searched: 0,
      query: "",
      number: "",
      form: {
        cuisine: "",
        diet: "",
        intolerances: "",
      },
      submitError: [],
      // results: [] || this.$root.store.lastSearch,
      numbers: [{ value: null, text: "", disabled: true }],
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intoleranceses: [{ value: null, text: "", disabled: true }],
      sortby: "",
      lastsearch: "",
      sort_time: "s",
      sort_popularity: "s",
    };
  },

  async created() {
    console.log("in Search Page");
    this.getLastSearch();
  },

  mounted() {
    this.numbers.push(...numbers);
    this.numbers.shift();
    this.number = this.numbers[0];

    this.cuisines.push(...cuisines);
    this.cuisines.shift();

    this.diets.push(...diets);
    this.diets.shift();

    this.intoleranceses.push(...intoleranceses);
    this.intoleranceses.shift();
  },

  methods: {
    onChangeQuery() {
      console.log("in onChangeQuery");
      this.$emit("query", this.query);
      // this.$emit("searched", this.searched);
    },

    onSearch() {
      console.log("in OnSearch");
      this.searched += 1;
      this.lastsearch = this.query;
    },

    onReset() {
      this.query = "";
      this.number = this.numbers[0];
      this.form.diet = "";
      this.form.cuisine = "";
      this.form.intolerances = "";
      this.sortby = "";
      this.sort_time = "s";
      this.sort_popularity = "s";
      this.searched = 0;
      
    },

    sortBy(sort_type) {
      if (sort_type == "time") {
        if (this.sortby == "readyInMinutes") {
          this.sortby = "";
          this.sort_time = "s";
        } else {
          this.sortby = "readyInMinutes";
          this.sort_time = "p";
          this.sort_popularity = "s";
        }
      } else if (sort_type == "popularity") {
        if (this.sortby == "aggregateLikes") {
          this.sortby = "";
          this.sort_popularity = "s";
        } else {
          this.sortby = "aggregateLikes";
          this.sort_popularity = "p";
          this.sort_time = "s";
        }
      }

      if (searched > 0) {
        this.searched += 1;
      }
    },

    async getLastSearch() {
      
    },

  
  },
};
</script>
<style lang="scss">
#searchId{
  color: rosybrown; 
  background-image:url("@/assets/back.png");
  padding-top:100px;
  min-height: 100vh;
  min-width: 100vw;
  background-size: cover; /* Make the image cover the entire container */
  background-repeat: repeat-y; /* Make the image repeat vertically when scrolling down */
  background-attachment: scroll; /* Allow the background image to scroll*/

}

</style>


