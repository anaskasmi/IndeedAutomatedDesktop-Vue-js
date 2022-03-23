<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Incentives"
    v-model="job.incentiveSets"
    :items="incentivesSets"
    @change="handleSetsChange"
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
  methods: {
    handleSetsChange() {
      const incentives = new Set(this.job.incentivesItems);
      for (const incentivesSet of this.job.incentiveSets) {
        for (const item of incentivesSet.incentives) {
          incentives.add(item.name);
        }
      }
      this.job = Object.assign({}, this.job, {
        incentives: [...incentives],
      });
    },
  },
};
</script>