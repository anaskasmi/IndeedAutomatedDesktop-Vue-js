<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Qualities :
        <QualitiesInput />
      </div>
      <v-row align="center" class="col-12"> </v-row>
      <v-row class="col-12" justify="start">
        <v-row class="col-12" v-if="job.qualities && job.qualities.length">
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

        <div v-for="set in job.qualities" :key="set._id">
          <v-chip
            v-for="item in set.qualities"
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
import QualitiesInput from "@/views/description-builder/create-job-description/components/inputs/QualitiesInput.vue";
import QualitiesMixin from "@/views/description-builder/create-job-description/mixins/qualitiesMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  components: {
    QualitiesInput,
  },
  mixins: [QualitiesMixin, JobMixin],
};
</script>