<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10"
      >8- Key qualifications for your role Reviewing</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn
      color="#effad3"
      large
      dark
      class="align-middle text-dark"
      elevation="0"
      @click="confirm()"
      :disabled="isLoading"
    >
      <v-icon class="mr-3">mdi-debug-step-over</v-icon>
      Skip
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
    async confirm() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("repostPageModule/execute_skip_qualifications");
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
