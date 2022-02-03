<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Incentive(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      multiple
      label="Incentives"
      :items="['incentive 1', 'incentive 2', 'incentive 3', 'incentive 4']"
      filled
      v-model="job.incentives"
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