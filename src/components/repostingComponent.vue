<template>
  <div v-if="currentJob">
    <div class="text-center">
       <v-alert
        tile
        type="info"
        color="#0077b6"
        prominent
        border="top"
      >
        <span class="font-weight-bold">Currently Reposting :</span> {{ currentJob.jobTitle }} <span class="text-warning"> / <span class="font-weight-bold">{{queueLenght-1}}</span> other jobs left in queue</span>
      </v-alert>
    </div>
    <v-stepper
      editable
      v-model="currentStep"
      vertical
      class="mb-10"
      elevation="0"
    >
      <GetJobFullDetails />
      <OpenJobPostingPage />
      <UnlockCompanyNameInput />
      <FillInCompanyName />
      <FillInJobTitle />
      <FillInJobCategory />
      <FillInRolesLocation />
      <ClickSaveAndContinue />
    </v-stepper>
  </div>
</template>

<script>
import OpenJobPostingPage from "./reposting sub component/openJobPostingPage";
import GetJobFullDetails from "./reposting sub component/getJobFullDetails";
import UnlockCompanyNameInput from "./reposting sub component/unlockCompanyNameInput";
import FillInCompanyName from "./reposting sub component/fillIn_CompanyName";
import FillInJobTitle from "./reposting sub component/fillIn_JobTitle";
import FillInJobCategory from "./reposting sub component/fillIn_JobCategory";
import FillInRolesLocation from "./reposting sub component/fillIn_RolesLocation";
import ClickSaveAndContinue from "./reposting sub component/clickSaveAndContinue";

export default {

    name:'repostingComponent',

  components: {
    OpenJobPostingPage,
    GetJobFullDetails,
    UnlockCompanyNameInput,
    FillInCompanyName,
    FillInJobTitle,
    FillInJobCategory,
    FillInRolesLocation,
    ClickSaveAndContinue,
  },

  computed: {
    currentJob: {
      get() {
        return this.$store.getters.getCurrentJob;
      },
    },
    queueLenght: {
      get() {
        return this.$store.getters.getQueueLength;
      },
    },
  },
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
      let url = this.BASE_URL() + "/jobs/getNewBrowser";
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

