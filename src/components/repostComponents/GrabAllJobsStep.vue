<template>
  <v-container class="my-10">
    <div class="text-right">
      <v-btn tile color="info" class="my-10" @click="scrapAllJobs">
        <v-icon class="mr-2">mdi-refresh</v-icon>
        Rexecute
      </v-btn>
    </div>
    <v-progress-linear
      class="my-10"
      v-if="isLoading"
      indeterminate
      color="teal"
    ></v-progress-linear>
    <v-alert
      outlined
      type="info"
      prominent
      border="left"
      v-if="isLoading && !isDoneScraping && !scrapingFailed"
    >
      please wait a second we are grabing the jobs from Indeed for you !
    </v-alert>
    <v-alert
      outlined
      type="info"
      prominent
      border="left"
      v-if="!isLoading && !isDoneScraping && !scrapingFailed"
    >
      Please Click bellow to grab the jobs from Indeed
    </v-alert>
    <v-alert
      outlined
      type="error"
      prominent
      border="left"
      v-if="!isLoading && !isDoneScraping && scrapingFailed"
    >
      Error : {{ failureMsg }}
      <p>
        <small class="text-info"
          >tip : try to close the chromuim browser and reopen it, using the
          previous page
        </small>
      </p>
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
    <v-btn
      large
      tile
      block
      color="success"
      class="my-10"
      @click="scrapAllJobs"
      v-if="!isLoading && !isDoneScraping"
    >
      Grab All jobs from indeed
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: "GrabAllJobs",
  data() {
    return {
      isLoading: false,
      isDoneScraping: false,
      scrapingFailed: false,
      failureMsg: "",
    };
  },
  computed: {
    jobs: {
      get: function () {
        return this.$store.getters["repostPageModule/getJobs"];
      },
      set: function (newVal) {
        this.$store.commit("repostPageModule/setJobs", newVal);
      },
    },
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    scrapAllJobs() {
      this.jobs = [];
      this.$store.commit("repostPageModule/setSelectedJobs", []);
      this.isLoading = true;
      this.scrapingFailed = false;
      let url = this.BASE_URL() + "/jobs/scrapAllJobs";
      this.$axios
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.isDoneScraping = true;
          this.jobs = res.data.jobs;
        })
        .catch((error) => {
          this.isLoading = false;
          this.scrapingFailed = true;
          this.failureMsg = error.response.data.error;
          console.log(error);
        });
    },
  },
};
</script>
