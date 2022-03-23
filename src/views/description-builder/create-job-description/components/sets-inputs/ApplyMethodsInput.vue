<template >
  <v-combobox
    hide-details
    clearable
    light
    multiple
    :solo-inverted="isSoloInverted"
    label="Apply Methods"
    v-model="job.applyMethodsSets"
    :items="applyMethodsSets"
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
import ApplyMethodsMixin from "@/views/description-builder/create-job-description/mixins/applyMethodsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
export default {
  mixins: [JobMixin, ApplyMethodsMixin],
  props: ["isSoloInverted"],
  methods: {
    handleSetsChange() {
      const applyMethods = new Set(this.job.applyMethodsItems);
      for (const applyMethodsSet of this.job.applyMethodsSets) {
        for (const item of applyMethodsSet.applyMethods) {
          applyMethods.add(item.name);
        }
      }
      this.job = Object.assign({}, this.job, {
        applyMethods: [...applyMethods],
      });
    },
  },
};
</script>