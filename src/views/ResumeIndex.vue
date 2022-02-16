<template>
  <v-stepper v-model="currentStep" non-linear elevation="0">
    <v-stepper-header>
      <v-stepper-step editable :complete="false" step="1">
        Start Browser
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        editable
        :complete="false"
        step="2"
        @click="initRegrabJobsObj()"
      >
        Grab All jobs
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        editable
        :complete="false"
        step="3"
        @click="refreshJobs()"
      >
        Transfer Resumes
      </v-stepper-step>

    
    </v-stepper-header>

    <!-- steps cards -->
    <v-stepper-items elevation="0">
      <v-stepper-content step="1" elevation="0">
        <v-card elevation="0">
          <StartBrowserStepper />
        </v-card>
        <hr />

        <v-btn
          color="primary"
          tile
          large
          class="float-right"
          @click="initRegrabJobsObj()"
        >
          <v-icon>mdi-chevron-right </v-icon>

          Grab All jobs
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2" class="text-center">
        <GrabAllJobsStepper />
        <hr />

        <v-btn
          color="primary"
          tile
          large
          class="float-right"
          @click="
            currentStep = 3;
            refreshJobs();
          "
        >
          <v-icon>mdi-chevron-right </v-icon>
          Transfer Resumes
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <JobsListStepper />       
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import StartBrowserStepper from "../components/resumeComponents/StartBrowserStepper";
import GrabAllJobsStepper from "../components/resumeComponents/GrabAllJobsStepper";
import JobsListStepper from "../components/resumeComponents/JobsListStepper";
export default {
  name: "UpdatingHomePage",
  components: {
    StartBrowserStepper,
    GrabAllJobsStepper,
    JobsListStepper,
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  computed: {
    oneJobOrMoreSelected: {
      get() {
        return this.$store.getters[
          "updatePageModule/getIsRepostingPageEnabled"
        ];
      },
    },
    jobs: {
      get: function () {
        return this.$store.getters["updatePageModule/getJobs"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setJobs", newVal);
      },
    },
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    
    initRegrabJobsObj() {
      this.$store.commit("resumePageModule/initRegrabingJobsObject");
      this.currentStep = 2;
    },
    async refreshJobs() {
      await this.$store.dispatch("resumePageModule/fetchJobs");
    },
  },
};
</script>

<style scoped>
.v-stepper {
  box-shadow: 0px 0px #fff;
}
</style>