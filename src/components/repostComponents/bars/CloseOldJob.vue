<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10">9- Close old job page</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      color="#b83b5e"
      large
      dark
      class="align-middle"
      elevation="0"
      @click="CloseOldJob()"
      :disabled="isLoading"
    >
      <v-icon class="mr-3">mdi-close-outline </v-icon>
      Close Old Job
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
    async CloseOldJob() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("repostPageModule/execute_CloseJob");
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
