<template>
  <div>
    <v-stepper-step editable :step="stepNumber" :rules="[
      (status) => {
        return this.status != 'failed';
      },
    ]" :complete="this.status == 'done'" edit-icon="mdi-check" elevation="0">
      <div>
        Fill In Email :
        <span class="font-weight-light warning--text">
          ({{ email }})
        </span>
      </div>
    </v-stepper-step>

    <v-stepper-content :step="stepNumber" elevation="0">
      <v-alert v-if="status == 'notDone'" outlined type="warning" prominent border="left">
        This task, didn't start yet !
      </v-alert>
      <v-alert v-if="status == 'failed'" outlined type="error" prominent border="left">
        This task Failed, Rexecute it Or do it manually by Fillin The Email
      </v-alert>
      <v-alert v-if="status == 'done'" outlined type="success" prominent border="left">
        This task, done successfully !
      </v-alert>
      <v-alert v-if="status == 'doing'" outlined type="info" prominent border="left">
        This task is under execution
      </v-alert>
      <v-btn color="primary" @click="execute()" tile elevation="0" class="mb-10">
        Execute
      </v-btn>

      <v-btn color="success" @click="nextStep()" tile elevation="0" class="mb-10 mx-4">Next
      </v-btn>
    </v-stepper-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: ["stepNumber"],
  computed: {
    status: {
      get() {
        return this.$store.getters['repostPageModule/getRepostingSteps'].fillIn_email;
      },
    },
    email: {
      get() {
        return this.$store.getters["repostPageModule/getCurrentJob"]
          .email;
      },
    },
    failureMsg: {
      get() {
        return this.$store.getters['repostPageModule/getFailureMsgs'].fillIn_email;
      },
    },
  },
  methods: {
    execute() {
      this.$store.dispatch("repostPageModule/execute_fillIn_email");
    },
  },
};
</script>