<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Position(s) :
      </div>
      <v-row align="center" class="col-12">
        <PositionsInput />
      </v-row>
      <v-row class="col-12" justify="start">
        <v-row class="col-12" v-if="job.positions && job.positions.length">
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
          v-for="position in job.positions"
          :key="position"
        >
          {{ position }}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
import PositionsInput from "@/views/description-builder/create-job-description/components/sets-inputs/PositionsInput.vue";

export default {
  components: {
    PositionsInput,
  },
  mixins: [JobMixin],
};
</script>