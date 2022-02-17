<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Now describe it in a small paragraph :
      </div>
      <v-row align="center" class="col-12 mt-4">
        <CandidateDescriptionInput />
      </v-row>
    </v-card-text>
  </v-card>
</template><script>
import CandidateDescriptionInput from "@/views/description-builder/create-job-description/components/inputs/CandidateDescriptionInput.vue";

export default {
  components: {
    CandidateDescriptionInput,
  },
};
</script>