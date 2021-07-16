<template>
  <v-container class="my-10">
    <!-- rexecute btn -->
    <div class="text-right">
      <v-btn
        tile
        color="info"
        class="my-10"
        @click="reGrabJobsFromIndeed()"
        v-if="regrabingJobsStatus == 'failed'"
      >
        <v-icon class="mr-2">mdi-refresh</v-icon>
        Rexecute
      </v-btn>
    </div>
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
          >tip : try to close the chromuim browser and reopen it, using the
          previous page
        </small>
      </p>
    </v-alert>
    <v-alert
      outlined
      type="success"
      prominent
      border="left"
      v-if="regrabingJobsStatus == 'done'"
    >
      Jobs regrabed successfully, please Move on to the next page
    </v-alert>
    <v-btn
      large
      tile
      color="success"
      class="my-10"
      block
      @click="reGrabJobsFromIndeed()"
      v-if="!regrabingJobsStatus"
    >
      Grab All jobs from indeed
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: "GrabAllJobs",
  data() {
    return {};
  },
  computed: {
    regrabingJobsStatus: {
      get: function () {
        return this.$store.getters["resumePageModule/getRegrabingJobsObj"]
          .status;
      },
    },
    regrabingJobsMessage: {
      get: function () {
        return this.$store.getters["resumePageModule/getRegrabingJobsObj"]
          .message;
      },
    },
  },
  methods: {
    reGrabJobsFromIndeed() {
      this.$store.dispatch("resumePageModule/reGrabJobsFromIndeed");
    },
  },
};
</script>
