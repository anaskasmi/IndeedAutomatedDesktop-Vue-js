<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Tag(s) :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          light
          multiple
          label="Tags"
          v-model="job.tags"
          :items="tags"
          item-text="name"
          item-value="content"
          :loading="isLoading"
          :disabled="isLoading"
          chips
          :return-object="false"
          autocomplete="nope"
        ></v-combobox>
      </v-row>
    </v-card-text>
  </v-card>
</template><script>
export default {
  created() {
    this.fetchTags();
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async fetchTags() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderTagsModule/fetchTags"
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
    tags: {
      get: function () {
        return this.$store.getters["DescriptionBuilderTagsModule/tags"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderTagsModule/tags", newVal);
      },
    },
  },
};
</script>