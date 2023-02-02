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
        :rules="[() => oneJobOrMoreSelected]"
        error-icon="mdi-lock"
      >
        Reposting
      </v-stepper-step>
    </v-stepper-header>

    <!-- steps cards -->
    <v-stepper-items elevation="0">
      <!-- Login step -->
      <div v-if="error">
        <v-row class="col-12 my-4" no-gutters justify="center">
          <div class="col-10">
            <v-alert rounded="lg" border="left" dismissible type="error">
              Error: {{ error }}</v-alert
            >
          </div>
        </v-row>
        <div>
          <v-divider></v-divider>
        </div>
      </div>
      <v-stepper-content step="1" elevation="0">
        <v-row class="col-12" justify="end" no-gutters>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                rounded
                :color="
                  cookiesSaved
                    ? 'green lighten-4 white--text '
                    : 'orange darken-3 white--text'
                "
                @click="saveCookies"
                :loading="cookiesLoading"
                :disabled="cookiesLoading"
                :depressed="cookiesSaved"
              >
                <v-icon class="mr-2">mdi-cookie</v-icon>
                {{
                  cookiesSaved ? "Saved Successfully ! 🎉🎉" : "Save cookies"
                }}
              </v-btn>
            </template>
            <span
              >Please make sure Chromuim browser is open, You are on an Indeed
              page and the page is fully loaded</span
            >
          </v-tooltip>
        </v-row>
        <v-card elevation="0">
          <LoginComponent />
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

      <!-- !! end of Login step !!  -->

      <!-- grab all jobs -->
      <v-stepper-content step="2" class="text-center">
        <GrabAllJobs />
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
          Select Jobs To repost
        </v-btn>
      </v-stepper-content>
      <!-- !! end of list step !! -->
      <!-- grab all jobs -->
      <v-stepper-content step="3">
        <JobsListStep />
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
        <RepostingStep />
      </v-stepper-content>
      <!-- !! end of Reposting step !! -->
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import LoginComponent from "../components/repostComponents/StartBrowserStep";
import GrabAllJobs from "../components/repostComponents/GrabAllJobsStep";
import JobsListStep from "../components/repostComponents/JobsListStep";
import RepostingStep from "../components/repostComponents/RepostingStep";
export default {
  name: "RepostingHomePage",
  components: {
    LoginComponent,
    GrabAllJobs,
    JobsListStep,
    RepostingStep,
  },
  data() {
    return {
      currentStep: 1,
      cookiesLoading: false,
      error: null,
      cookiesSaved: false,
    };
  },
  computed: {
    oneJobOrMoreSelected: {
      get() {
        return this.$store.getters[
          "repostPageModule/getIsRepostingPageEnabled"
        ];
      },
    },
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
    openRepostingPage() {
      if (this.oneJobOrMoreSelected) {
        this.currentStep = 4;
      }
    },
    async refreshJobs() {
      await this.$store.dispatch("repostPageModule/fetchJobs");
    },
    async saveCookies() {
      this.cookiesLoading = true;
      try {
        this.error = null;
        this.cookiesSaved = false;
        await this.$store.dispatch("repostPageModule/saveCookies");
        this.cookiesSaved = true;
      } catch (error) {
        this.cookiesSaved = false;
        this.error =
          "couldn't save cookies, please make sure your chromuim browser is open and you are logged in";
      } finally {
        this.cookiesLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-stepper {
  box-shadow: 0px 0px #fff;
}
</style>