<template >
  <v-combobox
    hide-details
    clearable
    light
    multiple
    :solo-inverted="isSoloInverted"
    label="Apply Methods"
    v-model="job.applyMethods"
    :items="applyMethods"
    item-text="name"
    item-value="name"
    :loading="isLoading"
    :disabled="isLoading"
    chips
    :return-object="false"
    autocomplete="nope"
  ></v-combobox>
</template>

<script>
import ApplyMethodsMixin from "@/views/description-builder/create-job-description/mixins/applyMethodsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
export default {
  mixins: [JobMixin, ApplyMethodsMixin],
  props: ["isSoloInverted"],
};
</script>