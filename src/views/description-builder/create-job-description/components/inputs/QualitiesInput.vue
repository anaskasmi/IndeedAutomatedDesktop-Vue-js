<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
    hide-details
    clearable
    light
    multiple
    label="Qualities"
    v-model="job.qualitiesSets"
    :items="qualitiesSets"
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
import QualitiesMixin from "@/views/description-builder/create-job-description/mixins/qualitiesMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [JobMixin, QualitiesMixin],
  props: ["isSoloInverted"],
  methods: {
    handleSetsChange() {
      const qualities = new Set(this.job.qualitiesItems);
      for (const qualitiesSet of this.job.qualitiesSets) {
        for (const item of qualitiesSet.qualities) {
          qualities.add(item.name);
        }
      }
      this.job = Object.assign({}, this.job, {
        qualities: [...qualities],
      });
    },
  },
};
</script>