<template>
  <v-card class="pa-16">
    <v-card-text>
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
          v-model="job.positions"
          :items="items"
          item-text="name"
          item-value="name"
          :loading="isLoading"
          :disabled="isLoading"
          chips
          autocomplete="nope"
        ></v-combobox>
      </v-row>
    </v-card-text>
  </v-card>
</template><script>
export default {
  created() {
    this.fetchPositions();
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async fetchPositions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderPositionsModule/fetchPositionsItems"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    job: {
      get: function () {
        return this.$store.getters["DescriptionBuilderTemplateModule/job"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderTemplateModule/job", newVal);
      },
    },
    items: {
      get: function () {
        return this.$store.getters["DescriptionBuilderPositionsModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderPositionsModule/items", newVal);
      },
    },
  },
};
</script>