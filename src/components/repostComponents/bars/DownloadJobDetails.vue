<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10"
      >Download Job Details & Start reposting</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn
      color="#24a19c"
      large
      dark
      class="align-middle"
      elevation="0"
      @click="downloadJobDetails()"
      :disabled="isLoading"
    >
      <v-icon class="mr-3">mdi-download-circle-outline </v-icon>
      Download Job Details
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async downloadJobDetails() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("repostPageModule/execute_getJobFullDetails");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
</style>
