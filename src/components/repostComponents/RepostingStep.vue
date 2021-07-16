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
            AND
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

        <div v-if="doesJobHasFullDetails">
          <OpenPostJobBar />
          <OpenPostJobPage stepNumber="2" />

          <GettingStartedBar />
          <UnlockCompanyNameInput stepNumber="3" />
          <FillInCompanyName stepNumber="4" />
          <FillInJobTitle stepNumber="5" />
          <FillInRolesLocation stepNumber="6" />
          <FillInJobCategory stepNumber="7" />
          <FillInIsJobRemote stepNumber="8" />
          <FillInIndustry stepNumber="9" />

          <JobDetailsBar />

          <FillInIsJobFullTimeOrPartTime stepNumber="10" />
          <FillInSchedule stepNumber="11" />
          <FillInHiresNumber stepNumber="12" />
          <FillInDeadline stepNumber="13" />

          <CompensationDetailsBar />

          <FillInPaymentType stepNumber="14" />
          <FillInSalaryFromAndTo stepNumber="15" />

          <FillInPaymentPer stepNumber="16" />
          <FillInOtherBenefits stepNumber="17" />

          <JobDescriptionBar />

          <FillInDescription stepNumber="18" />

          <ApplicationSettingsBar />

          <FillInIsResumeRequired stepNumber="19" />
          <FillInEmail stepNumber="20" />

          <ApplicantQualificationsBar />

          <CloseQuestions stepNumber="21" />

          <CustomizedScreeningBar />
          <br />
          <PreviewJobBar />
          <br />

          <SponsoringPageBar />
          <ClickAdvanced stepNumber="22" />
          <FillInAdDurationType stepNumber="23" />
          <FillInAdDurationDate stepNumber="24" />
          <FillInCPC stepNumber="25" />
          <FillInAdBudget stepNumber="26" />

          <CloseOldJobBar />

          <CloseJob stepNumber="27" />
          <RepostNextJobComponent stepNumber="28" />
        </div>
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
import OpenPostJobPage from "./RepostingStepSubComponent/openPostJobPage";
import GetJobFullDetails from "./RepostingStepSubComponent/getJobFullDetails";
import UnlockCompanyNameInput from "./RepostingStepSubComponent/unlockCompanyNameInput";
import FillInCompanyName from "./RepostingStepSubComponent/fillIn_CompanyName";
import FillInJobTitle from "./RepostingStepSubComponent/fillIn_JobTitle";
import FillInJobCategory from "./RepostingStepSubComponent/fillIn_JobCategory";
import FillInRolesLocation from "./RepostingStepSubComponent/fillIn_RolesLocation";
import FillInIndustry from "./RepostingStepSubComponent/fillIn_industry";
import FillInIsJobFullTimeOrPartTime from "./RepostingStepSubComponent/fillIn_isJobFullTimeOrPartTime";
import FillInSchedule from "./RepostingStepSubComponent/fillIn_schedule";
import FillInHiresNumber from "./RepostingStepSubComponent/fillIn_hiresNumber";
import FillInDeadline from "./RepostingStepSubComponent/fillIn_deadline";
import FillInPaymentType from "./RepostingStepSubComponent/fillIn_paymentType";
import FillInPaymentPer from "./RepostingStepSubComponent/fillIn_paymentPer";
import FillInSalaryFromAndTo from "./RepostingStepSubComponent/fillIn_salaryFromAndTo";
import FillInDescription from "./RepostingStepSubComponent/fillIn_description";
import FillInIsResumeRequired from "./RepostingStepSubComponent/fillIn_isResumeRequired";
import ClickAdvanced from "./RepostingStepSubComponent/click_advanced";
import FillInAdDurationDate from "./RepostingStepSubComponent/fillIn_adDurationDate";
import FillInCPC from "./RepostingStepSubComponent/fillIn_CPC";
import FillInAdBudget from "./RepostingStepSubComponent/fillIn_adBudget";
import CloseJob from "./RepostingStepSubComponent/CloseJob";
import FillInEmail from "./RepostingStepSubComponent/fillIn_email";
import CloseQuestions from "./RepostingStepSubComponent/close_questions";
import RepostNextJobComponent from "./RepostingStepSubComponent/RepostNextJobComponent";
import FillInIsJobRemote from "./RepostingStepSubComponent/fillIn_isJobRemote";
import FillInOtherBenefits from "./RepostingStepSubComponent/fillIn_otherBenefits";
import FillInAdDurationType from "./RepostingStepSubComponent/fillIn_adDurationType";
import OpenPostJobBar from "./bars/OpenPostJobBar";
import GettingStartedBar from "./bars/GettingStarted";
import ApplicantQualificationsBar from "./bars/ApplicantQualifications";
import ApplicationSettingsBar from "./bars/ApplicationSettings";
import CloseOldJobBar from "./bars/CloseOldJob";
import JobDescriptionBar from "./bars/JobDescription";
import JobDetailsBar from "./bars/JobDetails";
import PreviewJobBar from "./bars/PreviewJob";
import SponsoringPageBar from "./bars/SponsoringPage";
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
    FillInIndustry,
    FillInIsJobFullTimeOrPartTime,
    FillInSchedule,
    FillInHiresNumber,
    FillInDeadline,
    FillInPaymentType,
    FillInPaymentPer,
    FillInDescription,
    FillInIsResumeRequired,
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
    OpenPostJobBar,
    GettingStartedBar,
    ApplicantQualificationsBar,
    ApplicationSettingsBar,
    CloseOldJobBar,
    JobDescriptionBar,
    JobDetailsBar,
    PreviewJobBar,
    SponsoringPageBar,
    CompensationDetailsBar,
    CustomizedScreeningBar,
    DownloadJobDetailsBar,
    FillInSalaryFromAndTo,
  },

  computed: {
    currentJob: {
      get() {
        return this.$store.getters["repostPageModule/getCurrentJob"];
      },
    },
    queueLenght: {
      get() {
        return this.$store.getters["repostPageModule/getQueueLength"];
      },
    },
    doesJobHasFullDetails: {
      get() {
        return this.$store.getters["repostPageModule/doesJobHasFullDetails"];
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

    async fillInGettingStartedPage() {
      await this.$store.dispatch(
        "repostPageModule/execute_unlockCompanyNameInput"
      );
      await this.$store.dispatch("repostPageModule/execute_fillIn_CompanyName");
      await this.$store.dispatch("repostPageModule/execute_fillIn_JobTitle");
      await this.$store.dispatch("repostPageModule/execute_fillIn_JobCategory");
      await this.$store.dispatch(
        "repostPageModule/execute_fillIn_RolesLocation"
      );
      await this.$store.dispatch("repostPageModule/execute_fillIn_isJobRemote");
      await this.$store.dispatch("repostPageModule/execute_fillIn_isJobRemote");
      await this.$store.dispatch(
        "repostPageModule/execute_clickSaveAndContinue"
      );
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