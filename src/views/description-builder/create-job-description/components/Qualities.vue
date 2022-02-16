<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Qualities(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      solo-inverted
      multiple
      label="Qualities"
      :items="items"
      item-text="name"
      item-value="name"
      :return-object="false"
      :loading="isLoading"
      :disabled="isLoading"
      v-model="job.qualities"
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
        return this.$store.getters["DescriptionBuilderQualitiesModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderQualitiesModule/items", newVal);
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