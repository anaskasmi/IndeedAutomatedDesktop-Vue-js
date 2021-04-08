<template>
  <div>
    
    <v-stepper-step editable step="3" :rules="[(status)=>{return (this.status!='failed')}]" :complete="this.status=='done'" edit-icon="mdi-check" elevation="0">
      Unlock Company Name
    </v-stepper-step>

    <v-stepper-content step="3" elevation="0">
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
        This task Failed, Rexecute it Or do it manually by clicking unlock on the company name
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
    };
  },
  props: ["stepNumber"],
  computed: {
    status: {
      get() {
        return this.$store.getters['repostPageModule/getRepostingSteps'].unlockCompanyNameInput;
      },
    },
    failureMsg: {
      get() {
        return this.$store.getters['repostPageModule/getFailureMsgs'].unlockCompanyNameInput;
      },
    },
  },
  methods: {
    execute() {
      this.$store.dispatch("repostPageModule/execute_unlockCompanyNameInput");
    },
  },
};
</script>