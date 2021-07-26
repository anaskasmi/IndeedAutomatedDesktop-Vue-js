<template>
  <div>
    <v-col class="my-10">
      <v-row class="ml-6" align="center" justify="center">
        <img class="cv-icon" src="@/assets/img/cv.svg" />
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
          @click="transferAllResumesForOneJob()"
          :disabled="isAllResumesUnderTransfer"
          :loading="isAllResumesUnderTransfer"
        >
          <v-icon class="mr-2">mdi-share-all</v-icon>
          Transefer All Resumes of This Job
        </v-btn>
      </v-row>
    </v-col>
  </div>
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
    isAllResumesUnderTransfer: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getIsAllResumesUnderTransfer"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setIsAllResumesUnderTransfer",
          newVal
        );
      },
    },
  },
  methods: {
    transferAllResumesForOneJob() {
      this.isAllResumesUnderTransfer = true;
      this.$store
        .dispatch("resumePageModule/transferAllResumesForOneJob")
        .then(() => {
          this.isAllResumesUnderTransfer = null;
          this.$swal({
            title: "Transfer Finished",
            confirmButtonColor: "#3085d6",
            text: "All Resumes Transfered successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          this.isAllResumesUnderTransfer = null;
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


