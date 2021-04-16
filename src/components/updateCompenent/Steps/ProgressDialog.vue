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
      <v-toolbar flat dark color="primary">
        <v-btn icon dark @click="isProgressDialogShowing = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Updating Jobs Status</v-toolbar-title>
      </v-toolbar>

      <!-- content -->
      <v-card-text>
        <div v-for="(job, i) in jobs" :key="i" class="my-10">
          <v-alert v-if="job.updateStatus == 'not-done'" type="warning" tile>
            <div >
              {{ job.jobTitle }}
            </div>
            <div>Hasn't Started yet</div>
          </v-alert>
          <v-alert v-if="job.updateStatus == 'done'" type="success" tile  elevation="1">
            <div class="font-weight-bold">
              {{ job.jobTitle }}
            </div>
            <div>Updated successfully</div>
          </v-alert>
          <v-alert
            v-if="job.updateStatus == 'under-processing'"
            type="info"
            tile
          >
            <div>
              {{ job.jobTitle }}
            </div>
            <div>
                <v-progress-circular
                  indeterminate
                  color="amber"
                ></v-progress-circular>
              <span class="font-weight-bold"> Status : </span>
              Under processing
            </div>
          </v-alert>
          <v-alert v-if="job.updateStatus == 'failed'" type="error" tile>
            <div>
              {{ job.jobTitle }}
            </div>
            <div>Failed</div>
          </v-alert>
        </div>
      </v-card-text>

      <div style="flex: 1 1 auto"></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    jobs: {
      get: function () {
        return this.$store.getters["updatePageModule/getJobsProgress"];
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
  },
  methods: {},
};
</script>