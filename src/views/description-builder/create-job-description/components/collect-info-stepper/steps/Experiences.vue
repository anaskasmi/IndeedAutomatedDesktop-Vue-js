<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Experience(s) :
        <ExperiencesInput />
      </div>
      <v-row align="center" class="col-12"> </v-row>
      <v-row class="col-12" justify="start">
        <v-row class="col-12" v-if="job.experiences && job.experiences.length">
          <v-alert
            color="#30475e"
            dark
            elevation="0"
            class="col-12 akaya py-5 font-weight-bold"
            border="top"
          >
            You picked
          </v-alert>
        </v-row>
        <v-chip
          color="info"
          outlined
          class="ma-2 akaya"
          v-for="experience in job.experiences"
          :key="experience"
        >
          {{ experience }}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import ExperiencesMixin from "@/views/description-builder/create-job-description/mixins/experiencesMixin.js";
import ExperiencesInput from "@/views/description-builder/create-job-description/components/inputs/ExperiencesInput.vue";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [ExperiencesMixin, JobMixin],
  components: {
    ExperiencesInput,
  },
};
</script>