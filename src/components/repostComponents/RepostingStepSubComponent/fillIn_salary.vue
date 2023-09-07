<template>
  <div>
    <v-stepper-step editable :step="stepNumber" :rules="[
      (status) => {
        return this.status != 'failed';
      },
    ]" :complete="status === 'done'" edit-icon="mdi-check" elevation="0">
      <div>
        Fill In Salary
        <span class="font-weight-light warning--text"> {{ displaySalaryRange }}</span>
        Per
        <span class="font-weight-light warning--text"> {{ salaryPeriod }}</span>
      </div>
    </v-stepper-step>

    <v-stepper-content :step="stepNumber" elevation="0">
      <v-alert v-if="status === 'notDone'" outlined type="warning" prominent border="left">
        This task didn't start yet!
      </v-alert>
      <v-alert v-if="status === 'failed'" outlined type="error" prominent border="left">
        This task Failed, Re-execute it Or do it manually by Filling the payment
        type Input (range or starting at or up to ...)
      </v-alert>
      <v-alert v-if="status === 'done'" outlined type="success" prominent border="left">
        This task done successfully!
      </v-alert>
      <v-alert v-if="status === 'doing'" outlined type="info" prominent border="left">
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
  props: ["stepNumber"],
  computed: {
    status: {
      get() {
        return this.$store.getters['repostPageModule/getRepostingSteps'].fillIn_salary;
      }
    },
    failureMsg: {
      get() {
        return this.$store.getters['repostPageModule/getFailureMsgs'].fillIn_salary;
      },
    },
    displaySalaryRange() {
      const { minSalary, maxSalary } = this.$store.getters["repostPageModule/getCurrentJob"];
      if (minSalary && maxSalary) {
        return `Range: $${minSalary} - $${maxSalary}`;
      } else if (minSalary) {
        return `Starting at $${minSalary}`;
      } else if (maxSalary) {
        return `Up to $${maxSalary}`;
      } else {
        return 'Salary not specified';
      }
    },
    salaryPeriod() {
      return this.$store.getters["repostPageModule/getCurrentJob"].salaryPeriod;
    },
  },
  methods: {
    execute() {
      this.$store.dispatch("repostPageModule/execute_fillIn_salary");
    },
    nextStep() {
      // Implement your logic for moving to the next step here
    },
  },
};
</script>
