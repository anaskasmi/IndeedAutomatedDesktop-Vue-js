<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Qualities(s) :</div>
    <QualitiesInput isSoloInverted />
  </v-row>
</template>

<script>
import QualitiesInput from "@/views/description-builder/create-job-description/components/items-inputs/QualitiesInput.vue";
import QualitiesMixin from "@/views/description-builder/create-job-description/mixins/qualitiesMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  components: {
    QualitiesInput,
  },
  mixins: [QualitiesMixin, JobMixin],
};
</script>