<template>
  <v-stepper v-model="currentStep" non-linear elevation="0">
    <v-stepper-header>
      <v-stepper-step editable :complete="false" step="1">
        Login
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
        Reposting
      </v-stepper-step>
    </v-stepper-header>

    <!-- steps cards -->
    <v-stepper-items elevation="0">
      <!-- Login step -->
      <v-stepper-content step="1" elevation="0">
        <v-card elevation="0">
          <LoginComponent />
        </v-card>
        <hr />

        <v-btn color="primary" tile large class="float-right" @click="currentStep = 2">
          <v-icon>mdi-chevron-right </v-icon>

          Grab All jobs
        </v-btn>
      </v-stepper-content>
      <!-- !! end of Login step !!  -->

      <!-- grab all jobs -->
      <v-stepper-content step="2" class="text-center">
        <GrabAllJobs />
        <hr />

        <v-btn color="primary" tile large class="float-right" @click="currentStep = 3;refreshJobs()">
          <v-icon>mdi-chevron-right </v-icon>
          Select Jobs To repost
        </v-btn>
      </v-stepper-content>
      <!-- !! end of list step !! -->
      <!-- grab all jobs -->
      <v-stepper-content step="3">
        <JobsList />
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
          Start reposting
        </v-btn>
      </v-stepper-content>
      <!-- !! end of list step !! -->
      <!-- Reposting step -->
      <v-stepper-content step="4">
        <RepostingComponent />
      </v-stepper-content>
      <!-- !! end of Reposting step !! -->
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import LoginComponent from "../components/LoginComponent";
import GrabAllJobs from "../components/GrabAllJobs";
import JobsList from "../components/JobsList";
import RepostingComponent from "../components/repostingComponent";
export default {
  name: "RepostingHomePage",
  components: {
    LoginComponent,
    GrabAllJobs,
    JobsList,
    RepostingComponent,
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  computed: {
    oneJobOrMoreSelected: {
      get() {
        return this.$store.getters.getIsRepostingPageEnabled;
      },
    },
    jobs: {
      get: function () {
        return this.$store.getters.getJobs;
      },
      set: function (newVal) {
        this.$store.commit("setJobs", newVal);
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
          this.jobs = this.sortJobsByDate(res.data.jobs);
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