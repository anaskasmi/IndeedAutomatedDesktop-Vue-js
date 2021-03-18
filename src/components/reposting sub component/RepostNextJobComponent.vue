<template>
  <div>
    <v-stepper-step
      editable
      :step="stepNumber"
      edit-icon="mdi-check"
      elevation="0"
    >
      Start Reposting the Next Job
    </v-stepper-step>

    <v-stepper-content :step="stepNumber" elevation="0">
      <v-btn
        color="primary"
        @click="execute()"
        tile
        elevation="0"
        class="mb-10"
      >
        Execute
      </v-btn>
    </v-stepper-content>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["stepNumber"],
  
  methods: {
    execute() {
      this.$store.commit("startRepostingTheNextJob");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },
};
</script>