<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Incentives"
    v-model="job.incentives"
    :items="incentivesSets"
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
import IncentivesMixin from "@/views/description-builder/create-job-description/mixins/incentivesMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
export default {
  mixins: [JobMixin, IncentivesMixin],
  props: ["isSoloInverted"],
};
</script>