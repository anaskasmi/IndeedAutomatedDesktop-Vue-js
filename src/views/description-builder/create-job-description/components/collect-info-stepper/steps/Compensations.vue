<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Compensation(s) :
      </div>
      <v-row align="center" class="col-12">
        <CompenstationsInput />
      </v-row>
      <v-row class="col-12" justify="start">
        <v-row
          class="col-12"
          v-if="job.compensations && job.compensations.length"
        >
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
          v-for="compensation in job.compensations"
          :key="compensation"
        >
          {{ compensation }}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import CompenstationsInput from "@/views/description-builder/create-job-description/components/sets-inputs/CompenstationsInput.vue";
import CompensationsMixin from "@/views/description-builder/create-job-description/mixins/compensationsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [CompensationsMixin, JobMixin],
  components: {
    CompenstationsInput,
  },
};
</script>