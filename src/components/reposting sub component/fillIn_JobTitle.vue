<template>
  <div>
    <v-stepper-step
      editable
      :step="stepNumber"
      :rules="[
        (status) => {
          return this.status != 'failed';
        },
      ]"
      :complete="this.status == 'done'"
      edit-icon="mdi-check"
      elevation="0"
    >
      Fill In Job title
    </v-stepper-step>

    <v-stepper-content :step="stepNumber" elevation="0">
      <v-alert
        v-if="status == 'notDone'"
        outlined
        type="warning"
        prominent
        border="left"
      >
        This task, didn't start yet !
      </v-alert>
      <v-alert
        v-if="status == 'failed'"
        outlined
        type="error"
        prominent
        border="left"
      >
        This task Failed, Rexecute it Or do it manually by Filling the job title
        Inputs
      </v-alert>
      <v-alert
        v-if="status == 'done'"
        outlined
        type="success"
        prominent
        border="left"
      >
        This task, done successfully !
      </v-alert>
      <v-alert
        v-if="status == 'doing'"
        outlined
        type="info"
        prominent
        border="left"
      >
        This task is under execution
      </v-alert>
      <v-btn
        color="primary"
        @click="execute()"
        tile
        elevation="0"
        class="mb-10"
      >
        Execute
      </v-btn>

      <v-btn
        color="success"
        @click="nextStep()"
        tile
        elevation="0"
        class="mb-10 mx-4"
        >Next
      </v-btn>
    </v-stepper-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: "notDone",
      failureMsg: "",
      currentJobId: null,
    };
  },
  props: ["stepNumber"],
  computed: {
    currentJob: {
      get: function () {
        return this.$store.getters.getCurrentJob;
      },
    },
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    execute() {
      this.status = "doing";
      this.failureMsg = "";
      let url = this.BASE_URL() + "/jobs/fillIn_JobTitle";
      this.$axios
        .post(url, { jobTitle: this.currentJob.jobTitle })
        .then(() => {
          this.status = "done";
        })
        .catch((error) => {
          this.status = "failed";
          this.failureMsg = error.response.data.error;
          console.log(error);
        });
    },
  },
};
</script>
