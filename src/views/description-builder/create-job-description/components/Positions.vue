<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Position(s) :</div>
    <v-combobox
      hide-details
      clearable
      solo-inverted
      light
      multiple
      label="Positions"
      v-model="job.positions"
      :items="positions"
      item-text="name"
      item-value="name"
      :loading="isLoading"
      :disabled="isLoading"
      chips
      :return-object="false"
      autocomplete="nope"
    ></v-combobox>
  </v-row>
</template>

<script>
import PositionsMixin from "@/views/description-builder/create-job-description/mixins/positionsMixin.js";
export default {
  mixins:[PositionsMixin],
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