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

        <hr />
        <span class="page-title">1- Getting Started page</span>
        <hr />
        <UnlockCompanyNameInput stepNumber="3" />
        <FillInCompanyName stepNumber="4" />
        <FillInJobTitle stepNumber="5" />
        <FillInJobCategory stepNumber="6" />
        <FillInRolesLocation stepNumber="7" />
        <FillInIsJobRemote stepNumber="8" />
        <ClickSaveAndContinue stepNumber="9" />

        <hr />
        <span class="page-title">2- Job Details page</span>
        <hr />
        <FillInIsJobFullTimeOrPartTime stepNumber="10" />
        <FillInSchedule stepNumber="11" />
        <FillInHiresNumber stepNumber="12" />
        <FillInDeadline stepNumber="13" />
        <ClickSaveAndContinue stepNumber="14" />

        <hr />
        <span class="page-title">3- Compensation Details page</span>
        <hr />
        <FillInPaymentType stepNumber="15" />
        <FillInPaymentFrom stepNumber="16" />
        <FillInPaymentTo stepNumber="17" />
        <FillInPaymentPer stepNumber="18" />
        <FillInOtherBenefits stepNumber="19" />
        <ClickSaveAndContinue stepNumber="20" />

        <hr />
        <span class="page-title">4- Additional Job Details page</span>
        <hr />
        <ClickSaveAndContinue stepNumber="21" />

        <hr />
        <span class="page-title">5- Job Description page</span>
        <hr />
        <FillInDescription stepNumber="22" />
        <ClickSaveAndContinue stepNumber="23" />

        <hr />
        <span class="page-title">6- Application Settings page</span>
        <hr />
        <FillInIsResumeRequired stepNumber="24" />
        <FillInEmail stepNumber="25" />
        <ClickSaveAndContinue stepNumber="26" />

        <hr />
        <span class="page-title">7- Applicant qualifications page</span>
        <hr />
        <CloseQuestions stepNumber="27" />
        <ClickSaveAndContinue stepNumber="28" />

        <hr />
        <span class="page-title">8- Preview Job page</span>
        <hr />
        <ClickSaveAndContinue stepNumber="29" />
        <ClickConfirm stepNumber="30" />
        <ClickAdvanced stepNumber="31" />
        <FillInAdDurationDate stepNumber="32" />
        <FillInCPC stepNumber="33" />
        <FillInAdBudget stepNumber="34" />
        <ClickSaveAndContinue stepNumber="35" />
        <CloseJob stepNumber="36" />
        <RepostNextJobComponent stepNumber="37" />
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
import FillInEmail from "./reposting sub component/fillIn_email";
import CloseQuestions from "./reposting sub component/close_questions";
import RepostNextJobComponent from "./reposting sub component/RepostNextJobComponent";
import FillInIsJobRemote from "./reposting sub component/fillIn_isJobRemote";
import FillInOtherBenefits from "./reposting sub component/fillIn_otherBenefits";

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
    FillInEmail,
    CloseQuestions,
    FillInIsJobRemote,
    FillInOtherBenefits,
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

<style scoped>
.page-title{
  color:#1976d2  ;
  font-weight: 700;
  font-size: 16px;
}
</style>