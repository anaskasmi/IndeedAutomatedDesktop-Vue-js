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

        <span
          v-for="set in job.applyMethods"
          class="float-right"
          :key="set._id"
        >
          <v-chip
            color="info"
            outlined
            class="ma-2 akaya"
            v-for="item in set.applyMethods"
            :key="item._id"
          >
            {{ item.name }}
          </v-chip>
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import ApplyMethodsInput from "@/views/description-builder/create-job-description/components/inputs/ApplyMethodsInput.vue";
import ApplyMethodsMixin from "@/views/description-builder/create-job-description/mixins/applyMethodsMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [ApplyMethodsMixin, JobMixin],
  components: {
    ApplyMethodsInput,
  },
};
</script>