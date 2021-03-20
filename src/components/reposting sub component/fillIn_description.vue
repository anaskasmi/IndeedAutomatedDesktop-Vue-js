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
      Fill In Description
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
        This task Failed, Rexecute it Or do it manually by Filling the
        description Input
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
        v-clipboard:copy="description"
        v-clipboard:success="onCopy"
        :color="textCopied?'#dddddd':'success'"
        tile
        :elevation="textCopied?0:2"
        class="mb-10 mx-4"
        >Copy
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
      textCopied: false,
    };
  },

  props: ["stepNumber"],
  computed: {
    description: {
      get() {
        return this.$store.getters.getCurrentJob.jobDescriptionHtml;
      },
    },
    status: {
      get() {
        return this.$store.getters.getRepostingSteps.fillIn_description;
      },
    },
    failureMsg: {
      get() {
        return this.$store.getters.getFailureMsgs.fillIn_description;
      },
    },
  },
  methods: {
    execute() {
      this.$store.dispatch("execute_fillIn_description");
    },
    onCopy() {
      this.textCopied = true;
    },
  },
};
</script>
