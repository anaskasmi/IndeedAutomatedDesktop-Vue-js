<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Apply only:</div>
    <v-text-field
      autocomplete="nope"
      label="Apply Only"
      hide-details
      filled
      clearable
      light
      v-model="job.applyOnly"
    ></v-text-field>
  </v-row>
</template>

<script>
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