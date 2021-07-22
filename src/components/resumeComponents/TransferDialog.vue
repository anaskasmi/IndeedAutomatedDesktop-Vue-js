<template>
  <!-- transfer dialog -->
  <div style="background-color: white">
    <v-dialog
      v-if="currentJobOpened && currentJobOpened.applicationCount"
      hide-overlay
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
      v-model="isTransferDialogVisible"
    >
      <v-card tile>
        <v-card-text class="my-4">
          <v-app-bar app color="blue-grey darken-2" dense dark>
            <v-btn icon dark @click="isTransferDialogVisible = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title> {{ currentJobOpened.jobTitle }}</v-toolbar-title>
          </v-app-bar>
          <br class="my-10" />
          <!-- content starts here -->
          <div>
            <v-col class="my-10">
              <v-row class="ml-6" align="center" justify="center">
                <img class="cv-icon" src="/cv.svg" />
                <div class="mx-10 candidates-text">
                  This job has
                  <span class="candidates-number">{{
                    currentJobOpened.applicationCount.total
                  }}</span>
                  Candidates
                </div>
              </v-row>
              <v-row class="align-center justify-center my-10">
                <v-btn
                  color="success"
                  class="py-6"
                  elevation="1"
                  @click="transferJobsResume(currentJobOpened.job_id)"
                >
                  <v-icon class="mr-2">mdi-share-all</v-icon>
                  Download ALL & Transefer ALL Resumes
                </v-btn>
              </v-row>
            </v-col>
          </div>
          <!-- 4 buttons -->
          <v-row justify="center">
            <v-btn
              :class="{
                'w-100 my-2': $vuetify.breakpoint.mdAndDown,
                'mx-2': $vuetify.breakpoint.mdAndUp,
              }"
              v-if="!isThisJobHasEmail"
              :loading="isGettingJobEmail"
              :disabled="isGettingJobEmail"
              outlined
              color="#00b0ff"
              @click="getJobEmail"
            >
              <v-icon class="mx-2">mdi-email-check</v-icon> Get the Job Email
            </v-btn>
            <v-btn
              outlined
              @click="getCandidatesDetails"
              color="#00b0ff"
              :loading="isGettingJobsCandidates"
              :disabled="isGettingJobsCandidates"
              :class="{
                'w-100 my-2': $vuetify.breakpoint.mdAndDown,
                'mx-2': $vuetify.breakpoint.mdAndUp,
              }"
              ><v-icon class="mx-2">mdi-account-multiple-check </v-icon> Get
              Candidates Details
            </v-btn>
            <v-btn
              outlined
              color="#00b0ff"
              :class="{
                'w-100 my-2': $vuetify.breakpoint.mdAndDown,
                'mx-2': $vuetify.breakpoint.mdAndUp,
              }"
              ><v-icon class="mx-2">mdi-file-download</v-icon> Download Resumes
            </v-btn>
            <v-btn
              outlined
              color="#00b0ff"
              :class="{
                'w-100 my-2': $vuetify.breakpoint.mdAndDown,
                'mx-2': $vuetify.breakpoint.mdAndUp,
              }"
              ><v-icon class="mx-2">mdi-file-move </v-icon> Transfer Resumes
            </v-btn>
          </v-row>
          <v-divider class="my-10"></v-divider>

          <v-row class="justify-center">
            <v-alert
              color="cyan"
              border="left"
              elevation="1"
              class="mb-8"
              colored-border
              icon="mdi-email"
            >
              Email :
              <span
                class="font-weight-bold grey--text text--darken-2"
                v-if="isThisJobHasEmail"
              >
                {{ currentJobOpened.jobDetails_emails[0] }}
              </span>
              <span
                class="font-weight-bold gret--text"
                v-else-if="isGettingJobEmail"
              >
                Lodaing ...
              </span>
              <span class="font-weight-bold" v-else> Unknown Email</span>
            </v-alert>
          </v-row>
          <v-row
            v-if="
              currentJobOpened.candidates &&
              currentJobOpened.candidates.length > 0
            "
            :class="{
              'grid-wrapper-sm': $vuetify.breakpoint.mdAndDown,
              'grid-wrapper-md': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <div
              v-for="candidate in currentJobOpened.candidates"
              :key="candidate.id"
            >
              <v-card class="text-center pa-4">
                <v-card-text class="text-center">
                  <img
                    class="candidate-image"
                    src="/undraw_profile_pic_ic5t.svg"
                    alt=""
                  />
                </v-card-text>
                <v-card-title class="justify-center">{{
                  candidate.name
                }}</v-card-title>

                <v-card-actions>
                  <v-btn
                    :color="candidate.lasteTransferDate?'grey':'blue'"
                    outlined
                    block
                    :disabled="resumerUnderTransfer != null"
                    :loading="resumerUnderTransfer == candidate.id"
                    @click="transferResumeOfOneCandidate(candidate.id)"
                  >
                    {{candidate.lasteTransferDate?'Re-Transfer Resume':'Transfer Resume'}}
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-btn text v-if="candidate.lasteTransferDate" disabled>
                Last Transer :
                {{ candidate.lasteTransferDate }}
              </v-btn>
            </div>
          </v-row>

          <v-row
            v-else
            :class="{
              'grid-wrapper-sm': $vuetify.breakpoint.mdAndDown,
              'grid-wrapper-md': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <div
              v-for="index in currentJobOpened.applicationCount.total"
              :key="index"
            >
              <v-card class="text-center pa-4">
                <v-card-text class="text-center">
                  <img
                    class="candidate-image"
                    src="/undraw_profile_pic_ic5t.svg"
                    alt=""
                  />
                </v-card-text>
                <v-card-title class="justify-center">Unknown</v-card-title>
              </v-card>
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGettingJobEmail: false,
      isGettingJobsCandidates: false,
      resumerUnderTransfer: null,
    };
  },
  computed: {
    isThisJobHasEmail() {
      return (
        this.currentJobOpened.jobDetails_emails &&
        this.currentJobOpened.jobDetails_emails.length > 0
      );
    },
    isTransferDialogVisible: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getIsTransferDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setIsTransferDialogVisible",
          newVal
        );
      },
    },
    currentJobOpened: {
      get: function () {
        return this.$store.getters["resumePageModule/getCurrentJobOpened"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setCurrentJobOpened", newVal);
      },
    },
  },
  methods: {
    getJobEmail() {
      this.isGettingJobEmail = true;
      this.$store
        .dispatch("resumePageModule/getJobEmailForCurrentJobOpened")
        .then(() => {
          this.isGettingJobEmail = false;
        })
        .catch((error) => {
          this.isGettingJobEmail = false;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            text: error.response.data.msg,
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        });
    },
    getCandidatesDetails() {
      this.isGettingJobsCandidates = true;
      this.$store
        .dispatch("resumePageModule/getCandidatesDetailsForCurrentJobOpened")
        .then(() => {
          this.isGettingJobsCandidates = false;
        })
        .catch((error) => {
          this.isGettingJobsCandidates = false;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            text: error.response.data.msg,
            icon: "warning",
          });
        });
    },
    transferResumeOfOneCandidate(candidateId) {
      this.resumerUnderTransfer = candidateId;
      this.$store
        .dispatch("resumePageModule/transferResumeOfOneCandidate", candidateId)
        .then(() => {
          this.resumerUnderTransfer = null;
          this.$swal({
            title: "Transfer Finished",
            confirmButtonColor: "#3085d6",
            text: "Resume Transfered successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          this.resumerUnderTransfer = null;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            text: error.response.data.msg,
            icon: "warning",
          });
        });
    },
  },
};
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

.grid-wrapper-sm {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
}
.grid-wrapper-md {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
}
.text-result {
  color: #ffbe0b;
  font-size: 1.3em;
}

.candidate-image {
  max-width: 8rem;
}
.cv-icon {
  max-width: 50px;
}

.candidates-text {
  color: #5f5f5f;
  font-size: 1.3em;
  font-weight: 600;
}

.candidates-number {
  font-family: "Lobster", cursive !important;
  color: #2c3e50;
  color: #112e36;
  font-size: 1.5em;
  /* font-style: italic; */
  font-weight: 600;
  margin: 0px 3px;
}
</style>