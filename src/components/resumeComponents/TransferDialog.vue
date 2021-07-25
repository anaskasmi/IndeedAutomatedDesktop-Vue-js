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
          <!-- title -->
          <v-app-bar app color="blue-grey darken-2" dense dark>
            <v-btn icon dark @click="isTransferDialogVisible = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title> {{ currentJobOpened.jobTitle }}</v-toolbar-title>
          </v-app-bar>
          <br class="my-10" />
          <!-- Transfer all resumes -->
          <TransferAllResumes />
          <!-- Control buttons -->
          <ControlButtons />
          <v-divider class="my-10"></v-divider>
          <!-- Job Email -->
          <JobEmail />

          <!-- candidates with data -->
          <CandidatesWithData v-if="isThisJobHasCandidates" />
          <!-- candidates without data -->
          <CandidatesWithoutData v-else />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TransferAllResumes from "./TransferDialogComponents/TransferAllResumes.vue";
import ControlButtons from "./TransferDialogComponents/ControlButtons.vue";
import JobEmail from "./TransferDialogComponents/JobEmail.vue";
import CandidatesWithData from "./TransferDialogComponents/CandidatesWithData.vue";
import CandidatesWithoutData from "./TransferDialogComponents/CandidatesWithoutData.vue";
export default {
  components: {
    TransferAllResumes,
    ControlButtons,
    JobEmail,
    CandidatesWithData,
    CandidatesWithoutData,
  },
  computed: {
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
    isThisJobHasCandidates() {
      return (
        this.currentJobOpened.candidates &&
        this.currentJobOpened.candidates.length > 0
      );
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
  methods: {},
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