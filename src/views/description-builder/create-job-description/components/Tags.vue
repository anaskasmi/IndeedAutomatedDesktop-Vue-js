<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Tags(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      multiple
      label="Tag sets"
      :items="['position 1', 'position 2', 'position 3', 'position 4']"
      filled
      v-model="job.tagSet"
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