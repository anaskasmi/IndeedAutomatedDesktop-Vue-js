<template>
  <div>
    <div v-if="currentJob">
      <div class="text-center">
        <v-alert style="font-size: 22px" tile type="warning" color="#f1f6f9" class="text-dark" prominent border="left"
          elevation="3">
          <span>Currently Reposting : </span>
          <span class="font-weight-bold" style="color: #3d7ea6">{{
            currentJob.jobTitle
          }}</span>
          <span>
            AND
            <span class="font-weight-bold" style="color: #ee6f57">{{
              queueLenght - 1
            }}
            </span>
            other jobs left in queue
          </span>
        </v-alert>
      </div>
      <v-stepper editable v-model="currentStep" vertical class="mb-10" elevation="0">
        <QuickRepost class="elevation-4 my-5" />
        <hr>
        <div v-if="doesJobHasFullDetails">
          <OpenPostJobBar />
          <OpenPostJobPage stepNumber="2" />

          <GettingStartedBar />
          <FillInJobTitle stepNumber="3" />
          <FillInHiresNumber stepNumber="4" />
          <FillInRolesLocation stepNumber="5" />

          <JobDetailsBar />
          <FillInIsJobFullTimeOrPartTime stepNumber="6" />
          <FillInSchedule stepNumber="7" />

          <CompensationDetailsBar />

          <FillIn_Salary stepNumber="8" />
          <FillInBenefits stepNumber="11" />

          <JobDescriptionBar />

          <FillInDescription stepNumber="12" />

          <div>
            <!-- 5 here goes : Set application preferences -->
            <ApplicationSettingsBar />
            <FillInIsResumeRequired stepNumber="13" />
            <FillInEmail stepNumber="14" />
            <FillInDeadline stepNumber="15" />
          </div>

          <div>
            <!-- 6 here goes : Review the job post -->
            <PreviewJobBar />
          </div>

          <div>
            <!-- 7 here goes : Customize your application process (close questions) -->
            <CustomizedPreScreeningBar class="mt-8" />
            <CloseQuestions stepNumber="16" />
          </div>

          <div>
            <!-- 8 here goes : sponsor -->
            <SponsoringPageBar class="mt-8" />
            <FillInAdDurationType stepNumber="17" />
            <FillInAdDurationDate stepNumber="18" />
            <FillInAdBudget stepNumber="19" />
          </div>

          <!-- 9 here goes : confirm -->
          <CloseOldJobBar />

          <CloseJob stepNumber="20" />
          <RepostNextJobComponent stepNumber="21" />
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
import FillInJobTitle from "./RepostingStepSubComponent/fillIn_JobTitle";
import FillInRolesLocation from "./RepostingStepSubComponent/fillIn_RolesLocation";
import FillInIsJobFullTimeOrPartTime from "./RepostingStepSubComponent/fillIn_isJobFullTimeOrPartTime";
import FillInSchedule from "./RepostingStepSubComponent/fillIn_schedule";
import FillInHiresNumber from "./RepostingStepSubComponent/fillIn_hiresNumber";
import FillInBenefits from "./RepostingStepSubComponent/fillIn_benefits";
import FillInDeadline from "./RepostingStepSubComponent/fillIn_deadline";
import FillIn_Salary from "./RepostingStepSubComponent/fillIn_salary";
import FillInDescription from "./RepostingStepSubComponent/fillIn_description";
import FillInIsResumeRequired from "./RepostingStepSubComponent/fillIn_isResumeRequired";
import FillInAdDurationDate from "./RepostingStepSubComponent/fillIn_adDurationDate";
import FillInAdBudget from "./RepostingStepSubComponent/fillIn_adBudget";
import CloseJob from "./RepostingStepSubComponent/CloseJob";
import FillInEmail from "./RepostingStepSubComponent/fillIn_email";
import CloseQuestions from "./RepostingStepSubComponent/close_questions";
import RepostNextJobComponent from "./RepostingStepSubComponent/RepostNextJobComponent";
import FillInAdDurationType from "./RepostingStepSubComponent/fillIn_adDurationType";
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
import QuickRepost from "./bars/QuickRepost.vue";
export default {
  name: "repostingComponent",

  components: {
    OpenPostJobPage,
    FillInJobTitle,
    FillInRolesLocation,
    FillInIsJobFullTimeOrPartTime,
    FillInSchedule,
    FillInHiresNumber,
    FillInDeadline,
    FillIn_Salary,
    FillInBenefits,
    FillInDescription,
    FillInIsResumeRequired,
    FillInAdDurationDate,
    FillInAdDurationType,
    FillInAdBudget,
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
    QuickRepost
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
      await this.$store.dispatch("repostPageModule/execute_fillIn_location");
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