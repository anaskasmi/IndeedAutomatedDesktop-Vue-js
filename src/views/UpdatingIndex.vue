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
        select jobs
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :editable="oneJobOrMoreSelected"
        @click="openRepostingPage()"
        :complete="false"
        step="4"
        :rules="[() => oneJobOrMoreSelected]"
        error-icon="mdi-lock"
        
      >
        Updating
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
          Select Jobs To Update
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <JobsListStepper />
        <hr />
        <v-btn
          color="primary"
          tile
          large
          class="float-right"
          @click="openRepostingPage()"
          :disabled="!oneJobOrMoreSelected"
        >
          <v-icon>mdi-chevron-right </v-icon>
          Start Updating
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <UpdateStepper />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import StartBrowserStepper from "../components/updateCompenent/StartBrowserStepper";
import GrabAllJobsStepper from "../components/updateCompenent/GrabAllJobsStepper";
import JobsListStepper from "../components/updateCompenent/JobsListStepper";
import UpdateStepper from "../components/updateCompenent/UpdateStepper";
export default {
  name: "UpdatingHomePage",
  components: {
    StartBrowserStepper,
    GrabAllJobsStepper,
    JobsListStepper,
    UpdateStepper,
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
    openRepostingPage() {
      if (this.oneJobOrMoreSelected) {
        this.currentStep = 4;
      }
    },
    initRegrabJobsObj() {
      this.$store.commit("updatePageModule/initRegrabingJobsObject");
      this.currentStep = 2;
    },
    async refreshJobs() {
      await this.$store.dispatch("updatePageModule/fetchJobs");
    },
  },
};
</script>

<style scoped>
.v-stepper {
  box-shadow: 0px 0px #fff;
}
</style>