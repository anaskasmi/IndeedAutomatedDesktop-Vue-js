<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        My Job is of type(s) :
      </div>
      <v-row align="center" class="col-12">
        <JobTypeInput />
      </v-row>
    </v-card-text>
  </v-card>
</template><script>
import JobTypeInput from "@/views/description-builder/create-job-description/components/items-inputs/JobTypeInput.vue";
export default {
  components: {
    JobTypeInput,
  },
};
</script>