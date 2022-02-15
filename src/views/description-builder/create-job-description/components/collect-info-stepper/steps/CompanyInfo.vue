<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        I'm promoting for the company :
      </div>
      <v-autocomplete
        hide-details
        clearable
        tile
        label="Company"
        :items="companies"
        item-text="name"
        autocomplete="nope"
        v-model="job.company"
      ></v-autocomplete>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  created() {
    this.fetchCompanies();
  },
  computed: {
    companies: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderCompaniesModule/companies"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderCompaniesModule/companies",
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
  methods: {
    async fetchCompanies() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderCompaniesModule/fetchCompanies"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>