<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
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
</template>

<script>
import TagsMixin from "@/views/description-builder/create-job-description/mixins/tagsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin, TagsMixin],
  props: ["isSoloInverted"],
};
</script>