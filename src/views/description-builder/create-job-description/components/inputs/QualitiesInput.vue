<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Qualities"
    v-model="job.qualities"
    :items="qualitiesSets"
    item-text="name"
    item-value="name"
    :loading="isLoading"
    :disabled="isLoading"
    chips
    :return-object="true"
    autocomplete="nope"
  ></v-combobox>
</template>

<script>
import QualitiesMixin from "@/views/description-builder/create-job-description/mixins/qualitiesMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin, QualitiesMixin],
  props: ["isSoloInverted"],
};
</script>