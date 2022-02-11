<template>
  <v-card class="pa-16">
    <v-cardt-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Can you describe your candidate in one word :
      </div>
      <v-row align="center" class="col-12 ">
        <v-combobox
          hide-details
          clearable
          light
          v-model="job.roleDescription"
          label="Role Desc"
          autocomplete="nope"
          :items="['talented', 'great', 'experienced']"
          chips
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