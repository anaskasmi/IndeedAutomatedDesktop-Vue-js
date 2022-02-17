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

        <div v-for="set in job.compensations" :key="set._id">
          <v-chip
            v-for="item in set.compensations"
            :key="item._id"
            color="info"
            outlined
            class="ma-2 akaya"
          >
            {{ item.name }}
          </v-chip>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import CompenstationsInput from "@/views/description-builder/create-job-description/components/inputs/CompenstationsInput.vue";
import CompensationsMixin from "@/views/description-builder/create-job-description/mixins/compensationsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [CompensationsMixin, JobMixin],
  components: {
    CompenstationsInput,
  },
};
</script>