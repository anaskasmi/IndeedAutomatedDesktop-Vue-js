<template>
  <v-row justify="center">
    <v-btn
      :class="{
        'w-100 my-2': $vuetify.breakpoint.mdAndDown,
        'mx-2': $vuetify.breakpoint.mdAndUp,
      }"
      :loading="isGettingJobEmail"
      :disabled="isGettingJobEmail"
      outlined
      :color="isThisJobHasEmail ? 'grey' : '#00b0ff'"
      @click="getJobEmail"
    >
      <v-icon class="mx-2">mdi-email-check</v-icon> Get the Job Email
    </v-btn>
    <v-btn
      outlined
      @click="getCandidatesDetails"
      :color="isThisJobHasCandidates ? 'grey' : '#00b0ff'"
      :loading="isGettingJobsCandidates"
      :disabled="isGettingJobsCandidates"
      :class="{
        'w-100 my-2': $vuetify.breakpoint.mdAndDown,
        'mx-2': $vuetify.breakpoint.mdAndUp,
      }"
      ><v-icon class="mx-2"
        >{{
          isThisJobHasCandidates
            ? "mdi-account-convert"
            : "mdi-account-multiple-check"
        }}
      </v-icon>
      {{
        isThisJobHasCandidates ? "Re-Grab Candidates" : "Get Candidates Details"
      }}
    </v-btn>
  </v-row>
</template>


<script>
export default {
  computed: {
    isGettingJobEmail: {
      get: function () {
        return this.$store.getters["resumePageModule/getIsGettingJobEmail"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setIsGettingJobEmail", newVal);
      },
    },
    isThisJobHasEmail() {
      return (
        this.currentJobOpened.jobDetails_emails &&
        this.currentJobOpened.jobDetails_emails.length > 0
      );
    },
    isGettingJobsCandidates: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getIsGettingJobsCandidates"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setIsGettingJobsCandidates",
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
  methods: {
    getJobEmail() {
      this.isGettingJobEmail = true;
      this.$store
        .dispatch("resumePageModule/getJobEmailForCurrentJobOpened")
        .then(() => {
          this.isGettingJobEmail = false;
          this.$swal({
            title: "Success",
            confirmButtonColor: "#3085d6",
            text: "Job Email fetched successfully",
            icon: "success",
          });
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
          this.$swal({
            title: "Success",
            confirmButtonColor: "#3085d6",
            text: "Candidates details fetched successfully",
            icon: "success",
          });
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
  },
};
</script>
