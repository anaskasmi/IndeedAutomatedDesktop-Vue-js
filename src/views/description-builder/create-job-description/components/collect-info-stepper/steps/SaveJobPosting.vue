<template>
  <v-card class="pa-16">
    <v-cardt-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Do you want to save this job posting for future use ?
      </div>
      <v-row align="center" class="col-12">
        <v-text-field label="Job posting name"></v-text-field>
      </v-row>
      <v-btn color="info">Save</v-btn>
      <v-btn color="info" text>Not now</v-btn>
    </v-cardt-text>
  </v-card>
</template><script>
export default {
  computed: {
    job: {
      get: function () {
        return this.$store.getters["DescriptionBuilderTemplateModule/job"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderTemplateModule/job", newVal);
      },
    },
  },
};
</script>