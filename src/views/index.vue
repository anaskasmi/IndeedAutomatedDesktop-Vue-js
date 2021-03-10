<template>
  <v-stepper v-model="e1" non-linear elevation="0">
    <v-stepper-header>
      <v-stepper-step editable :complete="false" step="1">
        Login
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step editable :complete="false" step="2">
        Grab All jobs
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step editable :complete="false" step="3">
        select jobs
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step editable :complete="false" step="4">
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
        <v-btn color="primary" tile large class="float-right" @click="e1 = 2">
          <v-icon>mdi-chevron-right </v-icon>

          Grab All jobs
        </v-btn>
      </v-stepper-content>
      <!-- !! end of Login step !!  -->

      <!-- grab all jobs -->
      <v-stepper-content step="2" class="text-center">
        <GrabAllJobs />

        <v-btn color="primary" tile large class="float-right" @click="e1 = 2">
          <v-icon>mdi-chevron-right </v-icon>
          Select Jobs To repost
        </v-btn>
      </v-stepper-content>
      <!-- !! end of list step !! -->
      <!-- grab all jobs -->
      <v-stepper-content step="3">
        <JobsList />
        <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>
      <!-- !! end of list step !! -->
      <!-- Reposting step -->
      <v-stepper-content step="4">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

        <v-btn text> Cancel </v-btn>
      </v-stepper-content>
      <!-- !! end of Reposting step !! -->
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import LoginComponent from "../components/LoginComponent";
import GrabAllJobs from "../components/GrabAllJobs";
import JobsList from "../components/JobsList";
export default {
  components: {
    LoginComponent,
    GrabAllJobs,
    JobsList,
  },
  data() {
    return {
      e1: 1,
    };
  },

  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    login() {
      let url = this.BASE_URL() + "/jobs/tryToLogin";
      this.$axios
        .get(url)
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.v-stepper {
  box-shadow: 0px 0px #fff;
}
</style>