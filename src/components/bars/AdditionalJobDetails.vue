<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10"
      >4- Additional Job Details page</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn
      color="#effad3"
      large
      dark
      class="align-middle text-dark"
      elevation="0"
      :disabled="isLoading"
      @click="saveAndContinue()"
    >
      <v-icon class="mr-3">mdi-debug-step-over</v-icon>
      Continue
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
    async saveAndContinue() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("execute_clickSaveAndContinue");
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
