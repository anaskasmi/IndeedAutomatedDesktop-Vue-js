<template >
  <v-autocomplete
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    tile
    label="Company"
    :items="companies"
    item-text="name"
    autocomplete="nope"
    v-model="job.company"
    return-object
  ></v-autocomplete>
</template>

<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
import companyMixin from "@/views/description-builder/create-job-description/mixins/companyMixin.js";

export default {
  mixins: [JobMixin, companyMixin],
  props: ["isSoloInverted"],
};
</script>