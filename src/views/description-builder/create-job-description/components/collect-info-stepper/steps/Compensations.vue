<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Compensation(s) :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          light
          multiple
          label="Compensations"
          :items="compensations"
          item-text="name"
          item-value="name"
          :loading="isLoading"
          :disabled="isLoading"
          v-model="job.compensations"
          chips
          autocomplete="nope"
          :return-object="false"
        ></v-combobox>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  created() {
    this.fetchItems();
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async fetchItems() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderCompensationsModule/fetchCompensationsItems"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    compensations: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderCompensationsModule/items"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderCompensationsModule/items",
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
};
</script>