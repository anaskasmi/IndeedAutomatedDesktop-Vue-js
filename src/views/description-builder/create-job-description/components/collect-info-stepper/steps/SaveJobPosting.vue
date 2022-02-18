<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Do you want to save this job posting for future use ?
      </div>
      <v-row align="center" class="col-12">
        <v-text-field
          filled
          v-model="job.name"
          :disabled="isLoading"
          clearable
          hint="naming your postings will help you find them easier"
          label="Job posting name"
        >
        </v-text-field>
      </v-row>
      <v-btn
        color="info"
        :disabled="!job.name || isLoading"
        :loading="isLoading"
        @click="savePosting"
      >
        Save
      </v-btn>
      <v-btn
        color="info"
        @click="
          showSuccessMessage('Generated successfully');
          collectInfoStepperIsVisible = false;
        "
        text
        >Later</v-btn
      >
    </v-card-text>
  </v-card>
</template><script>
import collectInfoStepperMixin from "@/views/description-builder/create-job-description/mixins/collectInfoStepperMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [collectInfoStepperMixin, JobMixin],
};
</script>