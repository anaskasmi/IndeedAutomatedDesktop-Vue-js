<template >
  <v-text-field
    :solo-inverted="isSoloInverted"
    autocomplete="nope"
    label="Apply Only"
    hide-details
    clearable
    light
    v-model="job.applyOnly"
  ></v-text-field>
</template>

<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin],
  props: ["isSoloInverted"],
};
</script>