<template>
<div>
  <div v-if="currentJob">
    <div class="text-center">
      <v-alert tile type="info" color="#0077b6" prominent border="top">
        <span class="font-weight-bold">Currently Reposting :</span>
        {{ currentJob.jobTitle }}
        <span class="text-warning">
          / <span class="font-weight-bold">{{ queueLenght - 1 }}</span> other
          jobs left in queue</span
        >
      </v-alert>
    </div>
    <v-stepper
      editable
      v-model="currentStep"
      vertical
      class="mb-10"
      elevation="0"
    >
      <GetJobFullDetails stepNumber="1" />
      <OpenPostJobPage stepNumber="2" />
      <UnlockCompanyNameInput stepNumber="3" />
      <FillInCompanyName stepNumber="4" />
      <FillInJobTitle stepNumber="5" />
      <FillInJobCategory stepNumber="6" />
      <FillInRolesLocation stepNumber="7" />
      <ClickSaveAndContinue stepNumber="8" />
      <FillInIsJobFullTimeOrPartTime stepNumber="9" />
      <FillInSchedule stepNumber="10" />
      <FillInHiresNumber stepNumber="11" />
      <FillInDeadline stepNumber="12" />
      <ClickSaveAndContinue stepNumber="13" />
      <FillInPaymentType stepNumber="14" />
      <FillInPaymentFrom stepNumber="15" />
      <FillInPaymentTo stepNumber="16" />
      <FillInPaymentPer stepNumber="17" />
      <ClickSaveAndContinue stepNumber="18" />
      <ClickSaveAndContinue stepNumber="19" />
      <FillInDescription stepNumber="20" />
      <ClickSaveAndContinue stepNumber="21" />
      <FillInIsResumeRequired stepNumber="22  " />
      <ClickSaveAndContinue stepNumber="23" />
      <ClickSaveAndContinue stepNumber="24" />
      <ClickSaveAndContinue stepNumber="25" />
      <ClickConfirm stepNumber="26" />
      <ClickAdvanced stepNumber="27" />
      <FillInAdDurationDate stepNumber="28" />
      <FillInCPC stepNumber="29" />
      <FillInAdBudget stepNumber="30" />
      <ClickSaveAndContinue stepNumber="31" />
      <CloseJob stepNumber="32" />
      <RepostNextJobComponent stepNumber="33" />
    </v-stepper>
  </div>
  <div v-else>
       <div class="text-center">
      <v-alert tile type="info" color="#0077b6" prominent border="top">
        <span class="font-weight-bold">No jobs in the queue</span>
      </v-alert>
    </div>
  </div>
  </div>
</template>

<script>
import OpenPostJobPage from "./reposting sub component/openPostJobPage";
import GetJobFullDetails from "./reposting sub component/getJobFullDetails";
import UnlockCompanyNameInput from "./reposting sub component/unlockCompanyNameInput";
import FillInCompanyName from "./reposting sub component/fillIn_CompanyName";
import FillInJobTitle from "./reposting sub component/fillIn_JobTitle";
import FillInJobCategory from "./reposting sub component/fillIn_JobCategory";
import FillInRolesLocation from "./reposting sub component/fillIn_RolesLocation";
import ClickSaveAndContinue from "./reposting sub component/clickSaveAndContinue";
import FillInIsJobFullTimeOrPartTime from "./reposting sub component/fillIn_isJobFullTimeOrPartTime";
import FillInSchedule from "./reposting sub component/fillIn_schedule";
import FillInHiresNumber from "./reposting sub component/fillIn_hiresNumber";
import FillInDeadline from "./reposting sub component/fillIn_deadline";
import FillInPaymentType from "./reposting sub component/fillIn_paymentType";
import FillInPaymentFrom from "./reposting sub component/fillIn_paymentFrom";
import FillInPaymentTo from "./reposting sub component/fillIn_paymentTo";
import FillInPaymentPer from "./reposting sub component/fillIn_paymentPer";
import FillInDescription from "./reposting sub component/fillIn_description";
import FillInIsResumeRequired from "./reposting sub component/fillIn_isResumeRequired";
import ClickConfirm from "./reposting sub component/click_confirm";
import ClickAdvanced from "./reposting sub component/click_advanced";
import FillInAdDurationDate from "./reposting sub component/fillIn_adDurationDate";
import FillInCPC from "./reposting sub component/fillIn_CPC";
import FillInAdBudget from "./reposting sub component/fillIn_adBudget";
import CloseJob from "./reposting sub component/CloseJob";
import RepostNextJobComponent from "./reposting sub component/RepostNextJobComponent";

export default {
  name: "repostingComponent",

  components: {
    OpenPostJobPage,
    GetJobFullDetails,
    UnlockCompanyNameInput,
    FillInCompanyName,
    FillInJobTitle,
    FillInJobCategory,
    FillInRolesLocation,
    ClickSaveAndContinue,
    FillInIsJobFullTimeOrPartTime,
    FillInSchedule,
    FillInHiresNumber,
    FillInDeadline,
    FillInPaymentType,
    FillInPaymentFrom,
    FillInPaymentTo,
    FillInPaymentPer,
    FillInDescription,
    FillInIsResumeRequired,
    ClickConfirm,
    ClickAdvanced,
    FillInAdDurationDate,
    FillInCPC,
    FillInAdBudget,
    CloseJob,
    RepostNextJobComponent,
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

