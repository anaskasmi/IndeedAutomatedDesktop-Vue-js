<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Experience(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      multiple
      label="Experiences"
      :items="['experience 1', 'experience 2', 'experience 3', 'experience 4']"
      filled
      v-model="job.experiences"
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