<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Compensations"
    :items="compensationsSets"
    @change="handleSetsChange"
    item-text="name"
    item-value="name"
    :loading="isLoading"
    :disabled="isLoading"
    v-model="job.compensationsSets"
    chips
    autocomplete="nope"
  ></v-combobox>
</template>

<script>
import CompensationsMixin from "@/views/description-builder/create-job-description/mixins/compensationsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin, CompensationsMixin],
  props: ["isSoloInverted"],
  methods: {
    handleSetsChange() {
      const compensations = new Set(this.job.compensationsItems);
      for (const compensationsSet of this.compensationsSets) {
        for (const item of compensationsSet.compensations) {
          compensations.add(item.name);
        }
      }
      this.job = Object.assign({}, this.job, {
        compensations: [...compensations],
      });
    },
  },
};
</script>