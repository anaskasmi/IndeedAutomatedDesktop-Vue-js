<template>
  <v-app-bar dark color="#0f3057">
    <v-toolbar-title class="ml-10">Open Post A New Job page</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      color="#28abb9"
      large
      dark
      class="align-middle mx-3"
      elevation="0"
      :disabled="isLoading"
      @click="goToPostJobPage"
    >
      <v-icon class="mr-3">mdi-skip-next</v-icon>
      Go To Post A New Job Page
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
    async goToPostJobPage() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("repostPageModule/execute_openPostJobPage");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
  computed: {
    collectInfoStepperIsVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible",
          newVal
        );
      },
    },
  },
};
</script>
<style scoped>
</style>
