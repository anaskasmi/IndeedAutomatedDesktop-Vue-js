<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10"
      >8- Sponsor job (budget : ${{ this.budget_amount }})</v-toolbar-title
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
  computed: {
    budget_amount: {
      get: function () {
        return this.$store.getters["repostPageModule/getCurrentJob"].budget_amount /100;
      },
    },
  },
  methods: {
    async fillInPage() {
      try {
        if (this.budget_amount > 5) {
          let result = await this.$swal.fire({
            title: `Current budget is ${this.budget_amount}!`,
            text: "Please keep an eye on the Budget Field, it's seems higher than the usual $5",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continue",
            cancelButtonText: `Cancel`,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#ddd",
          });
          if (!result.isConfirmed) {
            return;
          }
        }

        this.isLoading = true;
        await this.$store.dispatch(
          "repostPageModule/execute_goto_sponsor_page"
        );
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationType"
        );
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationDate"
        );
        await this.$store.dispatch("repostPageModule/execute_fillIn_adBudget");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async fillInPageAndContinue() {
      if (this.budget_amount > 5) {
        let result = await this.$swal.fire({
          title: `Current budget is $ ${this.budget_amount}!`,
          text: "Please keep an eye on the Budget Field, it's seems higher than the usual $5",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Continue",
          cancelButtonText: `Cancel`,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#ddd",
        });
        if (!result.isConfirmed) {
          return;
        }
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch(
          "repostPageModule/execute_goto_sponsor_page"
        );

        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationType"
        );
        await this.$store.dispatch(
          "repostPageModule/execute_fillIn_adDurationDate"
        );
        await this.$store.dispatch("repostPageModule/execute_fillIn_adBudget");
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
