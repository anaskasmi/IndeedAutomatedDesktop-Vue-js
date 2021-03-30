<template>
  <div>
    <div v-if="currentJob">
      <div class="text-center">
        <v-alert
          style="font-size: 22px"
          tile
          type="warning"
          color="#f1f6f9"
          class="text-dark"
          prominent
          border="left"
          elevation="3"
        >
          <span>Currently Reposting : </span>
          <span class="font-weight-bold" style="color: #3d7ea6">{{
            currentJob.jobTitle
          }}</span>
          <span>
            /
            <span class="font-weight-bold" style="color: #ee6f57">{{
              queueLenght - 1
            }}</span>
            other jobs left in queue</span
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
        <DownloadJobDetailsBar />
        <GetJobFullDetails stepNumber="1" />
        <OpenPostJobPage stepNumber="2" />

        <GettingStartedBar />

        <UnlockCompanyNameInput stepNumber="3" />
        <FillInCompanyName stepNumber="4" />
        <FillInJobTitle stepNumber="5" />
        <FillInJobCategory stepNumber="6" />
        <FillInRolesLocation stepNumber="7" />
        <FillInIsJobRemote stepNumber="8" />
        <!-- <ClickSaveAndContinue stepNumber="9" /> -->

        <JobDetailsBar />

        <FillInIsJobFullTimeOrPartTime stepNumber="10" />
        <FillInSchedule stepNumber="11" />
        <FillInHiresNumber stepNumber="12" />
        <FillInDeadline stepNumber="13" />
        <!-- <ClickSaveAndContinue stepNumber="14" /> -->

        <CompensationDetailsBar />

        <FillInPaymentType stepNumber="15" />
        <FillInPaymentFrom stepNumber="16" />
        <FillInPaymentTo stepNumber="17" />
        <FillInPaymentPer stepNumber="18" />
        <FillInOtherBenefits stepNumber="19" />
        <!-- <ClickSaveAndContinue stepNumber="20" /> -->

        <AdditionalJobDetailsBar />
        <br />

        <!-- <ClickSaveAndContinue stepNumber="21" /> -->

        <JobDescriptionBar />

        <FillInDescription stepNumber="22" />
        <!-- <ClickSaveAndContinue stepNumber="23" /> -->

        <ApplicationSettingsBar />

        <FillInIsResumeRequired stepNumber="24" />
        <FillInEmail stepNumber="25" />
        <!-- <ClickSaveAndContinue stepNumber="26" /> -->

        <ApplicantQualificationsBar />

        <CloseQuestions stepNumber="27" />
        <!-- <ClickSaveAndContinue stepNumber="28" /> -->

        <CustomizedScreeningBar />
        <!-- <ClickSaveAndContinue stepNumber="29" /> -->
        <br />
        <PreviewJobBar />
        <br />
        <!-- <ClickConfirm stepNumber="30" /> -->

        <SponsoringPageBar />
        <ClickAdvanced stepNumber="31" />
        <FillInAdDurationType stepNumber="32" />
        <FillInAdDurationDate stepNumber="33" />
        <FillInCPC stepNumber="34" />
        <FillInAdBudget stepNumber="35" />
        <!-- <ClickSaveAndContinue stepNumber="36" /> -->

        <CloseOldJobBar />

        <CloseJob stepNumber="37" />
        <RepostNextJobComponent stepNumber="38" />
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
// import ClickSaveAndContinue from "./reposting sub component/clickSaveAndContinue";
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
// import ClickConfirm from "./reposting sub component/click_confirm";
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
import FillInAdDurationType from "./reposting sub component/fillIn_adDurationType";
import GettingStartedBar from "./bars/GettingStarted";
import ApplicantQualificationsBar from "./bars/ApplicantQualifications";
import ApplicationSettingsBar from "./bars/ApplicationSettings";
import CloseOldJobBar from "./bars/CloseOldJob";
import JobDescriptionBar from "./bars/JobDescription";
import JobDetailsBar from "./bars/JobDetails";
import PreviewJobBar from "./bars/PreviewJob";
import SponsoringPageBar from "./bars/SponsoringPage";
import AdditionalJobDetailsBar from "./bars/AdditionalJobDetails";
import CompensationDetailsBar from "./bars/CompensationDetails";
import CustomizedScreeningBar from "./bars/CustomizedScreening";
import DownloadJobDetailsBar from "./bars/DownloadJobDetails";

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
    // ClickSaveAndContinue,
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
    // ClickConfirm,
    ClickAdvanced,
    FillInAdDurationDate,
    FillInAdDurationType,
    FillInCPC,
    FillInAdBudget,
    CloseJob,
    FillInEmail,
    CloseQuestions,
    FillInIsJobRemote,
    FillInOtherBenefits,
    RepostNextJobComponent,
    GettingStartedBar,
    ApplicantQualificationsBar,
    ApplicationSettingsBar,
    CloseOldJobBar,
    JobDescriptionBar,
    JobDetailsBar,
    PreviewJobBar,
    SponsoringPageBar,
    AdditionalJobDetailsBar,
    CompensationDetailsBar,
    CustomizedScreeningBar,
    DownloadJobDetailsBar,
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
    async fillInGettingStartedPage() {
      await this.$store.dispatch("execute_unlockCompanyNameInput");
      await this.$store.dispatch("execute_fillIn_CompanyName");
      await this.$store.dispatch("execute_fillIn_JobTitle");
      await this.$store.dispatch("execute_fillIn_JobCategory");
      await this.$store.dispatch("execute_fillIn_RolesLocation");
      await this.$store.dispatch("execute_fillIn_isJobRemote");
      await this.$store.dispatch("execute_fillIn_isJobRemote");
      await this.$store.dispatch("execute_clickSaveAndContinue");
    },
  },
};
</script>

<style scoped>
.page-title {
  color: #1976d2;
  font-weight: 700;
  font-size: 16px;
}
</style>