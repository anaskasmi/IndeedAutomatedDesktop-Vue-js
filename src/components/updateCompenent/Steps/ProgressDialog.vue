<template>
  <v-dialog
    v-model="isProgressDialogShowing"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <!-- toolbar -->
      <v-toolbar flat dark color="primary" elevation="3">
        <v-btn icon dark @click="isProgressDialogShowing = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Updating Jobs Status</v-toolbar-title>
      </v-toolbar>

      <!-- content -->
      <v-card-text>
        <div v-for="(job, i) in jobs" :key="i" class="my-10">
          <!-- hasn't started yet -->
          <v-alert
            v-if="job.updateStatus == 'not-done'"
            type="warning"
            elevation="3"
          >
            <v-row class="justify-content-between">
              <div class="ml-4 my-2">
                {{ job.jobTitle }}
                <div>Hasn't Started yet</div>
              </div>
              <v-btn
                @click="reupdateOneJob(job.job_id)"
                elevation="2"
                color="white"
                class="mr-4 my-auto text-dark"
                v-if="isUpdateFinished"
              >
                <v-icon class="mr-2">mdi-refresh</v-icon>
                Update again
              </v-btn>
            </v-row>
          </v-alert>

          <!-- done -->
          <v-alert
            v-if="job.updateStatus == 'done'"
            type="success"
            elevation="3"
          >
            <v-row class="justify-content-between">
              <div class="ml-4 my-2">
                {{ job.jobTitle }}
                <div>Updated successfully</div>
              </div>
              <v-btn
                @click="reupdateOneJob(job.job_id)"
                elevation="2"
                color="white"
                class="mr-4 my-auto text-dark"
                v-if="isUpdateFinished"
              >
                <v-icon class="mr-2">mdi-refresh</v-icon>
                Retry again
              </v-btn>
            </v-row>
          </v-alert>

          <!--under-processing  -->
          <v-alert
            v-if="job.updateStatus == 'under-processing'"
            type="info"
            elevation="3"
          >
            <v-row class="justify-content-between">
              <div class="ml-4 my-2">
                {{ job.jobTitle }}
                <div>
                  <v-progress-circular
                    indeterminate
                    color="amber"
                  ></v-progress-circular>
                  <span class="font-weight-bold"> Status : </span>
                  Under processing
                </div>
              </div>
              <v-btn
                @click="reupdateOneJob(job.job_id)"
                elevation="2"
                color="white"
                class="mr-4 my-auto text-dark"
                v-if="isUpdateFinished"
              >
                <v-icon class="mr-2">mdi-refresh</v-icon>

                Retry again
              </v-btn>
            </v-row>
          </v-alert>

          <!-- failed -->
          <v-alert
            v-if="job.updateStatus == 'failed'"
            type="error"
            elevation="3"
          >
            <v-row class="justify-content-between">
              <div class="ml-4 my-2">
                {{ job.jobTitle }}
                <div class="mt-2">Failed : {{ job.failureMsg }}</div>
              </div>
              <v-btn
                @click="reupdateOneJob(job.job_id)"
                elevation="2"
                color="white"
                class="mr-4 my-auto text-dark"
                v-if="isUpdateFinished"
              >
                <v-icon class="mr-2">mdi-refresh</v-icon>

                Retry again
              </v-btn>
            </v-row>
          </v-alert>
        </div>
        <!--****************************-->
        <!--***** regrab jobs part *****-->
        <!--****************************-->

        <div>
          <!-- loading spinner -->
          <v-progress-linear
            class="my-10"
            v-if="regrabingJobsStatus == 'under-processing'"
            indeterminate
            color="teal"
          ></v-progress-linear>
          <!-- messages -->
          <v-alert
            outlined
            type="info"
            prominent
            border="left"
            v-if="regrabingJobsStatus == 'under-processing'"
          >
            please wait a second we are grabing the jobs from Indeed for you !
          </v-alert>
          <v-alert
            outlined
            type="info"
            prominent
            border="left"
            v-if="!regrabingJobsStatus"
          >
            Please Click bellow to grab the jobs from Indeed
          </v-alert>
          <v-alert
            outlined
            type="error"
            prominent
            border="left"
            v-if="regrabingJobsStatus == 'failed'"
          >
            Error : {{ regrabingJobsMessage }}
            <p>
              <small class="text-info"
                >tip : try to close the chromuim browser and reopen it, using
                the previous page
              </small>
            </p>
          </v-alert>
          <v-alert
            outlined
            type="success"
            prominent
            border="left"
            class="mt-5"
            v-if="regrabingJobsStatus == 'done'"
          >
            Jobs regrabed successfully, All good now !
          </v-alert>

          <v-btn
            large
            tile
            outlined
            color="info"
            class="my-10"
            block
            @click="reGrabJobsFromIndeed"
            v-if="!regrabingJobsStatus"
          >
            Grab the updated jobs
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    jobs: {
      get: function () {
        return this.$store.getters["updatePageModule/getJobsProgress"];
      },
    },
    isUpdateFinished: {
      get: function () {
        return this.$store.getters["updatePageModule/getIsUpdateFinished"];
      },
    },
    isProgressDialogShowing: {
      get: function () {
        return this.$store.getters[
          "updatePageModule/getIsProgressDialogShowing"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "updatePageModule/setIsProgressDialogShowing",
          newVal
        );
      },
    },
    regrabingJobsStatus: {
      get: function () {
        return this.$store.getters["updatePageModule/getRegrabingJobsObj"]
          .status;
      },
    },
    regrabingJobsMessage: {
      get: function () {
        return this.$store.getters["updatePageModule/getRegrabingJobsObj"]
          .message;
      },
    },
  },

  methods: {
    reupdateOneJob(job_id) {
      this.$store.dispatch("updatePageModule/startUpdatingOneJob", job_id);
    },
    reGrabJobsFromIndeed() {
      this.$store.dispatch("updatePageModule/reGrabJobsFromIndeed");
    },
  },
};
</script>