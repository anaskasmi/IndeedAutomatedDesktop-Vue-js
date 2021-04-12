<template>
  <v-container>
    <v-btn color="primary" block @click="startUpdatingSelectedJobs">Start updating</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    startUpdatingSelectedJobs() {
      this.$store.dispatch("updatePageModule/startUpdatingSelectedJobs");
    },
  },
};
</script>