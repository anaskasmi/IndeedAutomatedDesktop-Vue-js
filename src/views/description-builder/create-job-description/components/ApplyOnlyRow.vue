<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Apply only if you</div>
    <ApplyOnlyInput isSoloInverted />
  </v-row>
</template>

<script>
import ApplyOnlyInput from "@/views/description-builder/create-job-description/components/sets-inputs/ApplyOnlyInput.vue";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
export default {
  mixins: [JobMixin,],
  components: {
    ApplyOnlyInput,
  },
};
</script>