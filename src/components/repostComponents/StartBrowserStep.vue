<template>
  <v-stepper
    editable
    v-model="currentStep"
    vertical
    class="mb-10"
    elevation="0"
  >
    <v-stepper-step editable step="1" :complete="false" elevation="0">
      Start the chromuim browser
    </v-stepper-step>

    <v-stepper-content step="1" elevation="0">
      <v-alert outlined type="warning" prominent border="left">
        Please Click open the browser, then keep the browser opened during this
        whole process
      </v-alert>

      <v-btn
        color="primary"
        @click="startTheBrowser()"
        tile
        elevation="0"
        class="mb-10"
      >
        Start the chromuim browser
      </v-btn>
    </v-stepper-content>

    <v-stepper-step editable step="2" :complete="false" elevation="0">
      Login
    </v-stepper-step>

    <v-stepper-content step="2" elevation="0">
      <v-alert outlined type="info" prominent border="left">
        Please Login!  And When you are sure that you logged In, you can move on to
        the next page
      </v-alert>
    </v-stepper-content>
  </v-stepper>
</template>

<script>

export default {
      name:'LoginComponent',

  data() {
    return {
      currentStep: 1,
    };
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    startTheBrowser() {
      let url = this.BASE_URL() + "/jobs/getNewBrowserForRepost";
      this.$axios
        .get(url)
        .then(() => {
          //move to the next page
          this.currentStep = 2;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

