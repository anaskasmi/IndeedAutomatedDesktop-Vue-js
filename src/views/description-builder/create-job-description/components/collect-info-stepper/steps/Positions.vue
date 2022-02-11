<template>
  <v-card class="pa-16">
    <v-cardt-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Position(s) :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          light
          multiple
          label="Positions"
          :items="['position 1', 'position 2', 'position 3', 'position 4']"
          
          v-model="job.positions"
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