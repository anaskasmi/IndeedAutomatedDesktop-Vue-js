<template >
  <div>
    <v-row align="center" class="col-12">
      The ideal candidate
      <v-col>
        <v-textarea
          solo-inverted
          autocomplete="nope"
          label="Candidate description"
          v-model="job.candidateDescription"
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
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