<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Compensation(s) :</div>
    <CompenstationsInput isSoloInverted />
  </v-row>
</template>

<script>
import CompenstationsInput from "@/views/description-builder/create-job-description/components/items-inputs/CompenstationsInput.vue";
import CompensationsMixin from "@/views/description-builder/create-job-description/mixins/compensationsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [CompensationsMixin, JobMixin],
  components: {
    CompenstationsInput,
  },
};
</script>