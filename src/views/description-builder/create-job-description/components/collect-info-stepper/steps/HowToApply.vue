<template>
  <v-card class="pa-16">
    <v-cardt-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        How to apply to your job :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          light
          multiple
          label=""
          :items="[
            'HTA 1',
            'HTA 2',
            'HTA 3',
            'HTA 4',
          ]"
          
          v-model="job.hta"
          chips
          autocomplete="nope"
        ></v-combobox>
      </v-row>
    </v-cardt-text>
  </v-card>
</template><script>
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