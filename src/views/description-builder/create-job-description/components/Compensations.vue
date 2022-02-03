<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Compensation(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      multiple
      label="Compensation"
      :items="[
        'Compensation 1',
        'Compensation 2',
        'Compensation 3',
        'Compensation 4',
      ]"
      filled
      v-model="job.compensations"
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