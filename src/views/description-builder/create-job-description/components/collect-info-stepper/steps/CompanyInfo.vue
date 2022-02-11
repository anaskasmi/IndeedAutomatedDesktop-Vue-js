<template>
  <v-card class="pa-16">
    <v-cardt-text>
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
    </v-cardt-text>
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