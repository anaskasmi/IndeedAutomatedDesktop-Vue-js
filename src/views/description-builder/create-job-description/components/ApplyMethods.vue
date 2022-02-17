<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">How to apply :</div>
    <ApplyMethodsInput isSoloInverted />
  </v-row>
</template>

<script>
import ApplyMethodsInput from "@/views/description-builder/create-job-description/components/inputs/ApplyMethodsInput.vue";
import ApplyMethodsMixin from "@/views/description-builder/create-job-description/mixins/applyMethodsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [ApplyMethodsMixin, JobMixin],
  components: {
    ApplyMethodsInput,
  },
};
</script>