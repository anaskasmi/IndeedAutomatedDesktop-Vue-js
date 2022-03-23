<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Experience(s) :</div>
    <ExperiencesInput isSoloInverted />
  </v-row>
</template>

<script>
import ExperiencesMixin from "@/views/description-builder/create-job-description/mixins/experiencesMixin.js";
import ExperiencesInput from "@/views/description-builder/create-job-description/components/items-inputs/ExperiencesInput.vue";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [ExperiencesMixin, JobMixin],
  components: {
    ExperiencesInput,
  },
};
</script>