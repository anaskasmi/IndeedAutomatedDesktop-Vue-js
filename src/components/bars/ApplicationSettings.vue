<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10"
      >6- Application Settings page</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn
      color="#f14668"
      large
      dark
      class="align-middle"
      elevation="0"
      @click="fillInPage()"
      :disabled="isLoading"
    >
      <v-icon class="mr-3">mdi-pause-octagon</v-icon>
      Fill in & stop
    </v-btn>
    <v-btn
      color="#28abb9"
      large
      dark
      class="align-middle mx-3"
      elevation="0"
      @click="fillInPageAndContinue()"
      :disabled="isLoading"
    >
      <v-icon class="mr-3">mdi-skip-next</v-icon>
      Fill in & Continue
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
    async fillInPage() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("execute_fillIn_isResumeRequired");
        await this.$store.dispatch("execute_fillIn_email");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async fillInPageAndContinue() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("execute_fillIn_isResumeRequired");
        await this.$store.dispatch("execute_fillIn_email");
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
