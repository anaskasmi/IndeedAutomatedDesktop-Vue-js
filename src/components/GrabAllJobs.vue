<template>
  <v-container class="my-10">
    <v-progress-linear
    class="my-10"
      v-if="isLoading"
      indeterminate
      color="teal"
    ></v-progress-linear>
    <v-alert outlined type="info" prominent border="left" v-if="isLoading && !isDoneScraping">
      please wait a second we are grabing the jobs from Indeed for you !
    </v-alert>
    <v-alert outlined type="info" prominent border="left" v-if="!isLoading && !isDoneScraping">
      Please Click bellow to grab the jobs from Indeed
    </v-alert>
    <v-alert
      outlined
      type="success"
      prominent
      border="left"
      v-if="isDoneScraping"
    >
      Jobs regrabed successfully, please Move on to the next page
    </v-alert>
    <v-btn large tile color="success" class="my-10" @click="scrapAllJobs" v-if="!isLoading && !isDoneScraping">
      Grab All jobs from indeed
    </v-btn>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      isDoneScraping: false,
    };
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    scrapAllJobs() {
      this.isLoading = true;
      let url = this.BASE_URL() + "/jobs/scrapAllJobs";
      this.$axios
        .get(url)
        .then(() => {
          this.isLoading = false;
          this.isDoneScraping = true;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
};
</script>
