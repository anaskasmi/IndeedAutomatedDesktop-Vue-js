<template>
  <v-card class="pa-16">
    <v-cardt-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Signature :
      </div>
      <v-row align="center" class="col-12">
        <v-switch
          v-model="job.showSignature"
          inset
          label="Show Signature"
        ></v-switch>
      </v-row>
      <v-row v-if="job.showSignature">
        <v-text-field label="Signature" v-model="job.signature"></v-text-field>
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