<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        My Job is of type(s) :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          v-model="job.jobType"
          light
          label="Job Type"
          autocomplete="nope"
          :items="['full-time', 'part-time']"
          chips
          multiple
        ></v-combobox>
      </v-row>
    </v-card-text>
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