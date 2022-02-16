<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Company culture:</div>
    <v-text-field
      autocomplete="nope"
      hide-details
      label="Company Culture"
      clearable
      solo-inverted
      v-model="job.company.culture"
      light
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