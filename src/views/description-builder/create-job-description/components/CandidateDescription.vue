<template >
  <div>
    <v-row align="center" class="col-12">
      The ideal candidate
      <v-col>
        <CandidateDescriptionInput isSoloInverted />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import CandidateDescriptionInput from "@/views/description-builder/create-job-description/components/items-inputs/CandidateDescriptionInput.vue";

export default {
  components: {
    CandidateDescriptionInput,
  },
};
</script>