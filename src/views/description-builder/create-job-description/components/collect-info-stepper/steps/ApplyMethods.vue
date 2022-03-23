<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        How To Apply :
      </div>
      <v-row align="center" class="col-12">
        <ApplyMethodsInput />
      </v-row>
      <v-row class="col-12" justify="center">
        <v-row
          class="col-12"
          v-if="job.applyMethods && job.applyMethods.length"
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
          v-for="applyMethod in job.applyMethods"
          :key="applyMethod"
        >
          {{ applyMethod }}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import ApplyMethodsInput from "@/views/description-builder/create-job-description/components/sets-inputs/ApplyMethodsInput.vue";
import ApplyMethodsMixin from "@/views/description-builder/create-job-description/mixins/applyMethodsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [ApplyMethodsMixin, JobMixin],
  components: {
    ApplyMethodsInput,
  },
};
</script>