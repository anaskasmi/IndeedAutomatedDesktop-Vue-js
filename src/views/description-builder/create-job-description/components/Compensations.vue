<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Compensation(s) :</div>
    <v-combobox
      hide-details
      clearable
      solo-inverted
      light
      multiple
      label="Compensations"
      :items="compensations"
      item-text="name"
      item-value="name"
      :loading="isLoading"
      :disabled="isLoading"
      v-model="job.compensations"
      chips
      autocomplete="nope"
      :return-object="false"
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
    compensations: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderCompensationsModule/items"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderCompensationsModule/items",
          newVal
        );
      },
    },
  },
};
</script>