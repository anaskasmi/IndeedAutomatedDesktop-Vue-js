<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">How to apply :</div>
    <v-combobox
      hide-details
      solo-inverted
      clearable
      light
      multiple
      label="Apply methods"
      :items="items"
      item-text="name"
      item-value="name"
      :loading="isLoading"
      :disabled="isLoading"
      :return-object="false"
      v-model="job.applyMethods"
      chips
      autocomplete="nope"
    ></v-combobox>
  </v-row>
</template>

<script>
export default {
  mixins: [],
  computed: {
    items: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderApplyMethodsModule/items"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderApplyMethodsModule/items",
          newVal
        );
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