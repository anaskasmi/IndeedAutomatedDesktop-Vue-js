<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Tags(s) :</div>
    <v-combobox
      hide-details
      clearable
      light
      solo-inverted
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