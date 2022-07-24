<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10">1- Provide basic information</v-toolbar-title>

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
      :disabled="isLoading"
      @click="fillInPageAndContinue"
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
        await this.$store.dispatch(
          "repostPageModule/execute_unlockCompanyNameInput"
        );
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_CompanyName"
        );
        await this.$store.dispatch("repostPageModule/execute_fillIn_JobTitle");
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_location"
        );

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async fillInPageAndContinue() {
      this.isLoading = true;
      try {
        try {
          await this.$store.dispatch(
            "repostPageModule/execute_unlockCompanyNameInput"
          );
        } catch (error) {
          this.isLoading = false;

          console.log(error);
        }
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_CompanyName"
        );
        await this.$store.dispatch("repostPageModule/execute_fillIn_JobTitle");
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_location"
        );

        await this.$store.dispatch(
          "repostPageModule/execute_clickSaveAndContinue"
        );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
</style>
