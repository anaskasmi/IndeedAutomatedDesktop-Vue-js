<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10">8- Sponsoring page</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      color="#fff"
      x-small
      dark
      class="align-middle mx-2 py-4"
      elevation="0"
      :disabled="isLoading"
      @click="endDateIncreaseNumber++"
    >
      <v-icon color="#28abb9" medium>mdi-plus</v-icon>
    </v-btn>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-chip class="ma-2 pa-5" color="#28abb9" label v-bind="attrs" v-on="on">
          <div class="font-weight-bold">{{ endDateIncreaseNumber }} days</div>
        </v-chip>
      </template>
      Number of days added to the old end-date
    </v-tooltip>

    <v-btn
      color="#fff"
      x-small
      dark
      class="align-middle py-4 mx-1"
      elevation="0"
      :disabled="isLoading"
      @click="decreaseEndDate()"
    >
      <v-icon color="#28abb9" medium>mdi-minus</v-icon>
    </v-btn>
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
      endDateIncreaseNumber: 3,
    };
  },
  methods: {
    async fillInPage() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("repostPageModule/execute_click_advanced");
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationType"
        );
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationDate",this.endDateIncreaseNumber
        );
        await this.$store.dispatch("repostPageModule/execute_fillIn_adBudget");
        await this.$store.dispatch("repostPageModule/execute_fillIn_CPC");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    decreaseEndDate() {
      if (this.endDateIncreaseNumber > 0) this.endDateIncreaseNumber--;
    },
    async fillInPageAndContinue() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("repostPageModule/execute_click_advanced");
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationType"
        );
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationDate",this.endDateIncreaseNumber
        );
        await this.$store.dispatch("repostPageModule/execute_fillIn_adBudget");
        await this.$store.dispatch("repostPageModule/execute_fillIn_CPC");
        await this.$store.dispatch(
          "repostPageModule/execute_clickSaveAndContinue"
        );
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
