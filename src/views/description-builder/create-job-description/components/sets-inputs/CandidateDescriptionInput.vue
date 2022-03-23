<template >
  <v-textarea
    :solo-inverted="isSoloInverted"
    autocomplete="nope"
    label="Ideal candidate description"
    v-model="job.candidateDescription"
  ></v-textarea>
</template>

<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin],
  props: ["isSoloInverted"],
};
</script>