<template>
  <v-card color="#F9F9F9" width="80%" class="mx-auto my-10" elevation="0">
    <v-card-title class="pl-10 pt-5 pb-0" style="color:#4F709C">
      Quick Repost
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-8">
      <v-alert v-if="error" type="danger" prominent>{{ error }}</v-alert>
      <v-row justify="start">
        <v-col cols="auto">
          <v-img width="200px" :src="require('@/assets/img/quick-repost.svg')" />
        </v-col>
        <v-col align-self="center">
          <div style="font-size: 17px; font-weight:300;">
            Quick Repost will repost the job with the same details as the original job Just In one click.
            please use "Quick Repost & Close" if you like to close the old job after reposting.
          </div>
          <v-row class="mt-10" justify="end">
            <v-btn color="#4F709C" dark large rounded class="align-middle" elevation="0" @click="repost()"
              :loading="isLoading">
              <v-icon class="mr-3">mdi-replay</v-icon>
              Quick Repost
            </v-btn>
            <v-btn color="#EA5455" large dark rounded class="align-middle mx-3" elevation="0" @click="repostAndClose()"
              :loading="isLoading">
              <v-icon class="mr-3">mdi-close-outline</v-icon>
              Quick Repost & Close
            </v-btn>
          </v-row>

        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async repost() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "repostPageModule/duplicateJob"
        );
        await this.$store.dispatch("repostPageModule/execute_duplicateJob");
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        console.log(error);
      }
      finally {
        this.isLoading = false;
      }
    },
    async repostAndClose() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "repostPageModule/execute_duplicateJob"
        );
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
.gradient {
  background: linear-gradient(109.6deg, rgb(17, 17, 17) 11.2%, rgb(74, 73, 103) 91.1%);
}
</style>
