<template>
  <v-row
    :class="{
      'grid-wrapper-sm': $vuetify.breakpoint.mdAndDown,
      'grid-wrapper-md': $vuetify.breakpoint.mdAndUp,
    }"
  >
    <div v-for="candidate in currentJobOpened.candidates" :key="candidate.id">
      <v-card class="text-center pa-4">
        <v-card-text class="text-center">
          <img
            class="candidate-image"
            src="/undraw_profile_pic_ic5t.svg"
            alt=""
          />
        </v-card-text>
        <v-card-title class="justify-center">{{ candidate.name }}</v-card-title>

        <v-card-actions>
          <v-btn
            :color="candidate.lasteTransferDate ? 'grey' : 'blue'"
            outlined
            block
            :disabled="candidateIdUnderTransfer != null"
            :loading="candidateIdUnderTransfer == candidate.id"
            @click="transferResumeOfOneCandidate(candidate.id)"
          >
            {{
              candidate.lasteTransferDate
                ? "Re-Transfer Resume"
                : "Transfer Resume"
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-btn text v-if="candidate.lasteTransferDate" disabled>
        Last Transfer :
        {{ candidate.lasteTransferDate }}
      </v-btn>
    </div>
  </v-row>
</template>


<script>
export default {
  computed: {
    currentJobOpened: {
      get: function () {
        return this.$store.getters["resumePageModule/getCurrentJobOpened"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setCurrentJobOpened", newVal);
      },
    },
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
  },
  methods: {
      transferResumeOfOneCandidate(candidateId) {
      this.candidateIdUnderTransfer = candidateId;
      this.$store
        .dispatch("resumePageModule/transferResumeOfOneCandidate", candidateId)
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
  },
};
</script>
