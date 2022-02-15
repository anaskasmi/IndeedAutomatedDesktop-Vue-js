<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Qualities :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          light
          multiple
          label="Qualities"
          :items="items"
          item-text="name"
          item-value="name"
          :return-object="false"
          :loading="isLoading"
          :disabled="isLoading"
          v-model="job.qualities"
          chips
          autocomplete="nope"
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
          "DescriptionBuilderQualitiesModule/fetchQualitiesItems"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    items: {
      get: function () {
        return this.$store.getters["DescriptionBuilderQualitiesModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderQualitiesModule/items", newVal);
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