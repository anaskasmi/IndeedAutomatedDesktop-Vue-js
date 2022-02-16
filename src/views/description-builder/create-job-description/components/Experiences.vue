<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Experience(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      multiple
      solo-inverted
      label="Experiences"
      :items="items"
      item-text="name"
      item-value="name"
      :return-object="false"
      :loading="isLoading"
      :disabled="isLoading"
      v-model="job.experiences"
      chips
      autocomplete="nope"
    ></v-combobox>
  </v-row>
</template>

<script>
export default {
  computed: {
    items: {
      get: function () {
        return this.$store.getters["DescriptionBuilderExperiencesModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderExperiencesModule/items", newVal);
      },
    },
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