<template>
    <b-modal
      id="add-recipe-modal"
      ref="modal"
      title="Add New Recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      >Ceate You're New Recipe:
      <br />
      <br />
      <b-form ref="form" @submit.prevent="handleSubmit" @reset.prevent="resetModal">
        <b-form-group label="Recipe's Title: " label-for="title-input">
          <b-form-input
            id="title-input"
            v-model="$v.form.title.$model"
            type="text"
            :state="validateState('title')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.title.required">
            Recipes's title is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.title.alpha">
            Recipce's title can only contain letters
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-form-group label="Recipe's image URL: " label-for="image-input">
          <b-form-input
            id="image-input"
            v-model="$v.form.image.$model"
            type="url"
            :state="validateState('image')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.title.required">
            Recipe's image URL is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.title.url">
            Recipe's image URL should be URL
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-form-group label="Recipe's Servings: " label-for="servings-input">
          <b-form-input
            id="servings-input"
            v-model="$v.form.servings.$model"
            type="number"
            min="1"
            :state="validateState('servings')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.servings.required">
            Recipe's servings is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.servings.numeric">
            Recipe's servings should be numeric
          </b-form-invalid-feedback>
          <!-- <b-form-invalid-feedback v-if="!$v.form.servings.betweenS">
            Recipe's servings should be 1 serve minimum
          </b-form-invalid-feedback> -->
        </b-form-group>
  
        <b-form-group label="Recipe's Time: " label-for="readyInMinutes-input">
          <b-form-input
            id="readyInMinutes-input"
            v-model="$v.form.readyInMinutes.$model"
            type="number"
            min="1"
            :state="validateState('readyInMinutes')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.required">
            Recipe's time is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.numeric">
            Recipe's time should be numeric
          </b-form-invalid-feedback>
          <!-- <b-form-invalid-feedback v-if="!$v.form.readyInMinute.betweenRIM">
            Recipe's time should be 1 minute minimum
          </b-form-invalid-feedback> -->
        </b-form-group>
  
        <b-form-group label="Vegan: " label-for="vegan-input">
          <b-form-checkbox
            switch
            class="mr-n2 mb-n1"
            id="vegan-input"
            v-model="form.vegan"
          >
            <span class="sr-only"></span>
          </b-form-checkbox>
        </b-form-group>
  
        <b-form-group label="Vegetarian: " label-for="vegetarian-input">
          <b-form-checkbox
            switch
            class="mr-n2 mb-n1"
            id="vegetarian-input"
            v-model="form.vegetarian"
          >
            <span class="sr-only"></span>
          </b-form-checkbox>
        </b-form-group>
  
        <b-form-group label="Gluten Free: " label-for="gluten_free-input">
          <b-form-checkbox
            switch
            class="mr-n2 mb-n1"
            id="gluten-free-input"
            v-model="form.gluten_free"
          >
            <span class="sr-only"></span>
          </b-form-checkbox>
        </b-form-group>
      </b-form>
  
      <b-form @submit.stop.prevent="handleSubmit">
        <label>Ingredients:</label>
        <b-form-group
          v-for="ing in $v.form.ingrediants.$each.$iter"
          :key="ing.key"
        >
          <b-form-input
            :state="validateState('ingrediants')"
            v-model.trim="ing.value.$model"
            type="text"
            required
            placeholder="Ingredient"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!ing.value.required">
            Recipes's ingredient is required
          </b-form-invalid-feedback>
          <!-- <b-form-invalid-feedback v-if="!ing.value.alpha">
            Recipce's ingredient can only contain letters
          </b-form-invalid-feedback> -->
        </b-form-group>
  
        <b-button-toolbar>
          <b-button-group>
            <b-button
              title="Add Ingrediant"
              variant="outline-primary"
              @click="addIngredient"
            >
              <b-icon icon="plus" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              title="Remove Ingrediant"
              variant="outline-primary"
              @click="removeIngredient"
            >
              <b-icon icon="dash" aria-hidden="true"></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </b-form>
  
      <b-form @submit.stop.prevent="handleSubmit">
        <label>Instructions:</label>
        <b-form-group
          v-for="ins in $v.form.instractions.$each.$iter"
          :key="ins.key"
        >
          <b-form-input
            :state="validateState('instractions')"
            v-model.trim="ins.value.$model"
            type="text"
            required
            placeholder="Instruction"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!ins.value.required">
            Recipes's instruction is required
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-button-toolbar>
          <b-button-group>
            <b-button
              title="Add Instruction"
              variant="outline-primary"
              @click="addInstruction"
            >
              <b-icon icon="plus" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              title="Remove Instruction"
              variant="outline-primary"
              @click="removeInstruction"
            >
              <b-icon icon="dash" aria-hidden="true"></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </b-form>
    </b-modal>
  </template>
  
  <script>
  import { BModal } from "bootstrap-vue";
  import {
    required,
    alpha,
    numeric,
    url,
    // between,
  } from "vuelidate/lib/validators";
  
  export default {
    name: "NewRecipe",
    data() {
      return {
        form: {
          title: undefined,
          image: undefined,
          servings: undefined,
          readyInMinutes: undefined,
          vegan: false,
          vegetarian: false,
          gluten_free: false,
          ingrediants: [{ key: 1, value: undefined }],
          instractions: [{ key: 1, value: undefined }],
          popularity: 0,
          submitError: undefined,
        },
        ingrediantsCounter: 1,
        instructionsCounter: 1,
      };
    },
  
    comments: {
      BModal,
    },
  
    validations: {
      form: {
        title: {
          required,
          alpha,
        },
        image: {
          required,
          url,
        },
        servings: {
          required,
          numeric,
          // betweenS: between(1, 1000)
        },
        readyInMinutes: {
          required,
          numeric,
          // betweenRIM: between(1, 1400)
        },
        ingrediants: {
          $each: {
            value: {
              required,
              // alpha,
            },
          },
        },
        instractions: {
          $each: {
            value: {
              required,
              // alpha,
            },
          },
        },
      },
    },
    methods: {
      validateState(param) {
        const { $dirty, $error } = this.$v.form[param];
        return $dirty ? !$error : null;
      },
  
      // checkFormValidity() {
      //   const valid = this.$refs.form.checkValidity();
      //   this.nameState = valid;
      //   return valid;
      // },
  
      resetModal() {
        this.form = {
          title: undefined,
          image: undefined,
          servings: undefined,
          readyInMinutes: undefined,
          vegan: false,
          vegetarian: false,
          gluten_free: false,
          ingrediants: [{ key: 1, value: undefined }],
          instractions: [{ key: 1, value: undefined }],
          popularity: 0,
          submitError: undefined,
        };
        this.$nextTick(() => {
          this.$v.$reset();
        });
      },
  
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault();
        // Trigger submit handler
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.handleSubmit();
      },
  
      async createNewRecipe() {
        try {
          let _ingrediants = [];
  
          for (let i = 0; i < this.ingrediantsCounter; i++) {
            _ingrediants[i] = this.form.ingrediants[i].value;
          }
  
          let _instructions = [];
  
          for (let i = 0; i < this.instructionsCounter; i++) {
            _instructions[i] = this.form.instractions[i].value;
          }
  
          // this.form.ingrediants = _ingredients;
          // this.form.instractions = _instructions;
  
          const response = await this.axios.post(
            this.$root.store.server_domain + "/users/myRecipes",
            {
              title: this.form.title,
              image: this.form.image,
              readyInMinutes: this.form.readyInMinutes,
              popularity: this.form.popularity,
              vegan: this.form.vegan,
              vegetarian: this.form.vegetarian,
              gluten_free: this.form.gluten_free,
              ingredients: _ingrediants,
              instructions: _instructions,
              servings: this.form.servings,
              username:this.$root.store.username
            },
            { withCredentials: true }
          );
  
          if (response.status == 200) {
            this.$root.toast(
              "Created New Recipe",
              "New recipe added successfully",
              "success"
            );
          }
        } catch (err) {
          console.log("test");
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      },
  
      handleSubmit() {
        // Hide the modal manually
        this.createNewRecipe();
        this.$nextTick(() => {
          this.$bvModal.hide("add-recipe-modal");
        });
      },
  
      addIngredient() {
        this.ingrediantsCounter += 1;
  
        this.form.ingrediants.push({
          key: this.ingrediantsCounter,
          value: undefined,
        });
      },
  
      addInstruction() {
        this.instructionsCounter += 1;
  
        this.form.instractions.push({
          key: this.instructionsCounter,
          value: undefined,
        });
      },
  
      removeIngredient() {
        if (this.ingrediantsCounter > 1) {
          this.ingrediantsCounter -= 1;
          this.form.ingrediants.pop();
        }
      },
  
      removeInstruction() {
        if (this.instructionsCounter > 1) {
          this.instructionsCounter -= 1;
          this.form.instractions.pop();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  