<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Compensations"
    :items="compensations"
    item-text="name"
    item-value="name"
    :loading="isLoading"
    :disabled="isLoading"
    v-model="job.compensations"
    chips
    autocomplete="nope"
    :return-object="false"
  ></v-combobox>
</template>

<script>
import CompensationsMixin from "@/views/description-builder/create-job-description/mixins/compensationsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin, CompensationsMixin],
  props: ["isSoloInverted"],
};
</script>