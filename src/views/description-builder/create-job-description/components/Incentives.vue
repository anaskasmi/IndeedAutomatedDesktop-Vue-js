<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Incentive(s) :</div>
    <v-combobox
      hide-details
      clearable
      solo-inverted
      light
      multiple
      label="Incentives"
      :items="items"
      item-text="name"
      item-value="name"
      :loading="isLoading"
      :disabled="isLoading"
      v-model="job.incentives"
      :return-object="false"
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
        return this.$store.getters["DescriptionBuilderIncentivesModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderIncentivesModule/items", newVal);
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