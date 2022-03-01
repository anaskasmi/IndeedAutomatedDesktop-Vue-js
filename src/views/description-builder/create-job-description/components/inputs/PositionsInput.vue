<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Positions"
    v-model="job.positionSets"
    @change="handleSetsChange"
    :items="positionsSets"
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
import PositionsMixin from "@/views/description-builder/create-job-description/mixins/positionsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin, PositionsMixin],
  props: ["isSoloInverted"],
  methods: {
    handleSetsChange() {
      const positions = new Set(this.job.positionItems);
      for (const positionSet of this.job.positionSets) {
        for (const item of positionSet.positions) {
          positions.add(item.name);
        }
      }
      this.job = Object.assign({}, this.job, { positions: [...positions] });
    },
  },
};
</script>