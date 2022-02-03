<template >
  <div>
    <v-row align="center" class="col-12">
      <v-col cols="3">
        <v-combobox
          hide-details
          clearable
          light
          label="company name"
          :items="['company1', 'company2', 'company3', 'company4']"
          filled
          v-model="job.companyName"
          autocomplete="nope"
          chips
        ></v-combobox>
      </v-col>
      Is
      <v-col>
        <v-textarea
          autocomplete="nope"
          label="Company description"
          filled
          height="100"
          v-model="job.companyDescription"
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