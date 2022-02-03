<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Qualities(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      multiple
      label="Qualities"
      :items="['quality 1', 'quality 2', 'quality 3', 'quality 4']"
      filled
      v-model="job.qualities"
      chips
      autocomplete="nope"
    ></v-combobox>
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