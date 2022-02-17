<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Experiences"
    v-model="job.experiences"
    :items="experiencesSets"
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
import ExperiencesMixin from "@/views/description-builder/create-job-description/mixins/experiencesMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin, ExperiencesMixin],
  props: ["isSoloInverted"],
};
</script>