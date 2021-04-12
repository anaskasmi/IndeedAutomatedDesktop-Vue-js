<template>
  <v-stepper v-model="currentStep" non-linear elevation="0">
    <v-stepper-header>

      <v-stepper-step editable :complete="false" step="1">
        Start Browser
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step editable :complete="false" step="2">
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
      >
        Updating
      </v-stepper-step>

    </v-stepper-header>

    <!-- steps cards -->
    <v-stepper-items elevation="0">
      <!-- Login step -->
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
          @click="currentStep = 2"
        >
          <v-icon>mdi-chevron-right </v-icon>

          Grab All jobs
        </v-btn>
      </v-stepper-content>
      <!-- !! end of start browser step !!  -->

      <!-- grab all jobs -->
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
      <!-- !! end of list step !! -->
      <!-- grab all jobs -->
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
      <!-- !! end of list step !! -->
      <!-- Reposting step -->
      <v-stepper-content step="4">
        <UpdateStepper/>
      </v-stepper-content>
      <!-- !! end of Reposting step !! -->
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
    refreshJobs() {
      let url = this.BASE_URL() + "/jobs/getAllJobsFromDb";
      this.$axios
        .get(url)
        .then((res) => {
          this.jobs = res.data.jobs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.v-stepper {
  box-shadow: 0px 0px #fff;
}
</style>