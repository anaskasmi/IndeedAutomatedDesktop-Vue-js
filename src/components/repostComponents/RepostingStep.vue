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

          <JobDetailsBar />

          <FillInIsJobFullTimeOrPartTime stepNumber="7" />
          <FillInSchedule stepNumber="8" />
          <FillInHiresNumber stepNumber="9" />
          <FillInDeadline stepNumber="10" />

          <CompensationDetailsBar />

          <FillInPaymentType stepNumber="11" />
          <FillInSalaryFromAndTo stepNumber="12" />

          <FillInPaymentPer stepNumber="13" />
          <FillInBenefits stepNumber="14" />

          <JobDescriptionBar />

          <FillInDescription stepNumber="15" />

          <div>
            <!-- 5 here goes : Set application preferences -->
            <ApplicationSettingsBar />
            <FillInIsResumeRequired stepNumber="16" />
            <FillInEmail stepNumber="17" />
          </div>

          <div>
            <!-- 6 here goes : Customize your application process (close questions) -->
            <CustomizedPreScreeningBar class="mt-8" />
            <CloseQuestions stepNumber="18" />
          </div>

          <div>
            <!-- 7 here goes : Review the job post -->
            <PreviewJobBar />
          </div>

          <div>
            <!-- 8 here goes : sponsor -->
            <SponsoringPageBar class="mt-8" />
            <ClickAdvanced stepNumber="19" />
            <FillInAdDurationType stepNumber="20" />
            <FillInAdDurationDate stepNumber="21" />
            <FillInCPC stepNumber="22" />
            <FillInAdBudget stepNumber="23" />
          </div>

          <!-- 7 here goes : Review potential matches  -->
          <!-- <PotentialMatches class="mt-8" /> -->
          <!-- 8 here goes : Key qualifications   -->
          <!-- <RoleQualifications class="mt-8" /> -->

          <!-- confirm -->

          <CloseOldJobBar />

          <CloseJob stepNumber="24" />
          <RepostNextJobComponent stepNumber="25" />
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
import FillInRolesLocation from "./RepostingStepSubComponent/fillIn_RolesLocation";
import FillInIsJobFullTimeOrPartTime from "./RepostingStepSubComponent/fillIn_isJobFullTimeOrPartTime";
import FillInSchedule from "./RepostingStepSubComponent/fillIn_schedule";
import FillInHiresNumber from "./RepostingStepSubComponent/fillIn_hiresNumber";
import FillInBenefits from "./RepostingStepSubComponent/fillIn_benefits";
import FillInDeadline from "./RepostingStepSubComponent/fillIn_deadline";
import FillInPaymentType from "./RepostingStepSubComponent/fillIn_paymentType";
import FillInPaymentPer from "./RepostingStepSubComponent/fillIn_paymentPer";
import FillInSalaryFromAndTo from "./RepostingStepSubComponent/fillIn_salaryFromAndTo";
import FillInDescription from "./RepostingStepSubComponent/fillIn_description";
import FillInIsResumeRequired from "./RepostingStepSubComponent/fillIn_isResumeRequired";
import FillInAdDurationDate from "./RepostingStepSubComponent/fillIn_adDurationDate";
import FillInAdBudget from "./RepostingStepSubComponent/fillIn_adBudget";
import CloseJob from "./RepostingStepSubComponent/CloseJob";
import FillInEmail from "./RepostingStepSubComponent/fillIn_email";
import CloseQuestions from "./RepostingStepSubComponent/close_questions";
import RepostNextJobComponent from "./RepostingStepSubComponent/RepostNextJobComponent";
import FillInAdDurationType from "./RepostingStepSubComponent/fillIn_adDurationType";
import ClickAdvanced from "./RepostingStepSubComponent/click_advanced";
import FillInCPC from "./RepostingStepSubComponent/fillIn_CPC";
import OpenPostJobBar from "./bars/OpenPostJobBar";
import GettingStartedBar from "./bars/GettingStarted";
import CustomizedPreScreeningBar from "./bars/CustomizedPreScreening";
import ApplicationSettingsBar from "./bars/ApplicationSettings";
import CloseOldJobBar from "./bars/CloseOldJob";
import JobDescriptionBar from "./bars/JobDescription";
import JobDetailsBar from "./bars/JobDetails";
import PreviewJobBar from "./bars/PreviewJob";
import SponsoringPageBar from "./bars/SponsoringPage";
import CompensationDetailsBar from "./bars/CompensationDetails";
import DownloadJobDetailsBar from "./bars/DownloadJobDetails";
// import PotentialMatches from "./bars/PotentialMatches.vue";
// import RoleQualifications from "./bars/RoleQualifications.vue";

export default {
  name: "repostingComponent",

  components: {
    OpenPostJobPage,
    GetJobFullDetails,
    UnlockCompanyNameInput,
    FillInCompanyName,
    FillInJobTitle,
    FillInRolesLocation,
    FillInIsJobFullTimeOrPartTime,
    FillInSchedule,
    FillInHiresNumber,
    FillInDeadline,
    FillInPaymentType,
    FillInPaymentPer,
    FillInBenefits,
    FillInDescription,
    FillInIsResumeRequired,
    FillInAdDurationDate,
    FillInAdDurationType,
    FillInAdBudget,
    ClickAdvanced,
    FillInCPC,
    CloseJob,
    FillInEmail,
    CloseQuestions,
    RepostNextJobComponent,
    OpenPostJobBar,
    GettingStartedBar,
    ApplicationSettingsBar,
    CloseOldJobBar,
    JobDescriptionBar,
    JobDetailsBar,
    PreviewJobBar,
    SponsoringPageBar,
    CompensationDetailsBar,
    CustomizedPreScreeningBar,
    DownloadJobDetailsBar,
    FillInSalaryFromAndTo,
    // PotentialMatches,
    // RoleQualifications,
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
      await this.$store.dispatch(
        "repostPageModule/execute_fillIn_location"
      );
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