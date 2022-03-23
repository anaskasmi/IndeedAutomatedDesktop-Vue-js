<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    v-model="job.jobType"
    light
    label="Job Type"
    autocomplete="nope"
    :items="['full-time', 'part-time']"
    chips
    multiple
  ></v-combobox>
</template>

<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin],
  props: ["isSoloInverted"],
};
</script>