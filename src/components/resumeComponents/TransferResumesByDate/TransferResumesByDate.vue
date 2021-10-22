<template>
  <!-- transfer dialog -->
  <div style="background-color: white">
    <v-dialog
      hide-overlay
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
      v-model="isTransfeResumesByDateDialogVisible"
    >
      <v-card tile>
        <v-card-text class="my-4">
          <!-- title -->
          <v-app-bar app color="blue-grey darken-2" dense dark>
            <v-btn
              icon
              dark
              @click="isTransfeResumesByDateDialogVisible = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title> Transfer Resumes By Date & Time</v-toolbar-title>
          </v-app-bar>
          <br class="my-10" />
          <div class="text-center py-12">
            <v-alert
              color="info"
              border="left"
              elevation="1"
              class="mb-8"
              colored-border
              icon="mdi-calendar"
              v-if="startDate && endDate"
            >
              <span class="font-weight-bold grey--text text--darken-2">
                Selected Date range : {{ startDate }} ~ {{ endDate }}
              </span>
            </v-alert>
            <br />
            <v-row justify="center" align="center">
              <v-col>
                <div class="font-weight-bold grey--text text--darken-2 my-2">
                  Start Date
                </div>
                <v-date-picker
                  full-width
                  v-model="startDate"
                  elevation="2"
                  title="Start Date"
                ></v-date-picker>
              </v-col>
              <v-col>
                <div class="font-weight-bold grey--text text--darken-2 my-2">
                  End Date
                </div>
                <v-date-picker
                  full-width
                  v-model="endDate"
                  elevation="2"
                  title="End Date"
                  :min="startDate"
                ></v-date-picker>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mx-2">
              <v-btn
                large
                tile
                block
                color="success"
                class="my-10"
                :loading="isGettingCandidates"
                :disabled="isGettingCandidates || !startDate || !endDate"
                @click="fetchCandidatesByDate"
              >
                Get Candidates
              </v-btn>
            </v-row>
            <hr class="col-6 mx-auto my-10" />
            <div v-if="candidatesBetweenTwoDates.length > 0">
              <v-row justify="center" align="center" class="my-2">
                <h1
                  class="
                    font-weight-medium
                    text-center
                    grey--text
                    text--darken-2
                    my-2
                  "
                >
                  {{ candidatesBetweenTwoDates.length }} Candidates found
                </h1>
              </v-row>
              <v-row justify="center" align="center" class="my-6">
                <v-btn
                  color="info"
                  tile
                  @click="transferResumesOfCandidatesList"
                  :disabled="candidatesBetweenTwoDatesUnderTransfer"
                  :loading="candidatesBetweenTwoDatesUnderTransfer"
                >
                  Transfer All
                </v-btn>
              </v-row>
            </div>
            <v-row
              :class="{
                'grid-wrapper-sm': $vuetify.breakpoint.mdAndDown,
                'grid-wrapper-md': $vuetify.breakpoint.mdAndUp,
              }"
            >
              <div
                v-for="candidate in candidatesBetweenTwoDates"
                :key="candidate.id"
              >
                <v-card class="text-center pa-4">
                  <v-card-text class="text-center">
                    <img
                      class="candidate-image"
                      src="@/assets/img/undraw_profile_pic_ic5t.svg"
                      alt=""
                    />
                  </v-card-text>
                  <v-card-title class="justify-center">{{
                    candidate.name
                  }}</v-card-title>

                  <v-card-actions>
                    <v-btn
                      color="blue"
                      outlined
                      block
                      @click="
                        transferResumeOfOneCandidate(candidate)
                      "
                      :disabled="candidateIdUnderTransfer != null"
                      :loading="
                        candidateIdUnderTransfer == candidate.candidateId
                      "
                    >
                      Transfer Resume
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      isGettingCandidates: false,
      candidatesBetweenTwoDatesUnderTransfer: false,
    };
  },
  components: {},
  methods: {
    fetchCandidatesByDate() {
      this.isGettingCandidates = true;
      this.candidatesBetweenTwoDates = [];
      this.$store
        .dispatch("resumePageModule/getCandidatesBetweenTwoDates", {
          startDate: this.startDate,
          endDate: this.endDate,
        })
        .then(() => {
          this.isGettingCandidates = false;
          this.$swal({
            title: "Success",
            confirmButtonColor: "#3085d6",
            text: "Candidates fetched successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          this.isGettingCandidates = false;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            text: error.response.data.msg,
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        });
    },
    transferResumeOfOneCandidate(candidate) {
      this.candidateIdUnderTransfer = candidate.candidateId;
      this.$store
        .dispatch("resumePageModule/transferResumesOfCandidatesList", [
          candidate,
        ])
        .then(() => {
          this.candidateIdUnderTransfer = null;
          this.$swal({
            title: "Transfer Finished",
            confirmButtonColor: "#3085d6",
            text: "Resume Transfered successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.candidateIdUnderTransfer = null;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            text: error.response.data.msg,
            icon: "warning",
          });
        });
    },
    transferResumesOfCandidatesList() {
      this.candidatesBetweenTwoDatesUnderTransfer = true;
      this.$store
        .dispatch(
          "resumePageModule/transferResumesOfCandidatesList",
          this.candidatesBetweenTwoDates
        )
        .then(() => {
          this.candidatesBetweenTwoDatesUnderTransfer = false;
          this.$swal({
            title: "Transfer Finished",
            confirmButtonColor: "#3085d6",
            text: "Resume Transfered successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.candidatesBetweenTwoDatesUnderTransfer = false;
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

  computed: {
    candidateIdUnderTransfer: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getCandidateIdUnderTransfer"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setCandidateIdUnderTransfer",
          newVal
        );
      },
    },
    isTransfeResumesByDateDialogVisible: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getIsTransfeResumesByDateDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setIsTransfeResumesByDateDialogVisible",
          newVal
        );
      },
    },
    candidatesBetweenTwoDates: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getCandidatesBetweenTwoDates"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setCandidatesBetweenTwoDates",
          newVal
        );
      },
    },
  },
};
</script>



<style>
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