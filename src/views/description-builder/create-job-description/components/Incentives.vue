<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Incentive(s) :</div>
    <IncentivesInput isSoloInverted />
  </v-row>
</template>

<script>
import IncentivesMixin from "@/views/description-builder/create-job-description/mixins/incentivesMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
import IncentivesInput from "@/views/description-builder/create-job-description/components/inputs/IncentivesInput.vue";

export default {
  components: { IncentivesInput },
  mixins: [IncentivesMixin, JobMixin],
};
</script>