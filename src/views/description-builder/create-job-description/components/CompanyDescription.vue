<template >
  <div>
    <v-row align="center" class="col-12">
      <v-col cols="3">
        <v-text-field
          hide-details
          clearable
          solo-inverted
          light
          label="company name"
          v-model="job.company.name"
          autocomplete="nope"
          chips
        ></v-text-field>
      </v-col>
      Is
      <v-col>
        <v-textarea
          autocomplete="nope"
          label="Company description"
          v-model="job.company.description"
          clearable
          solo-inverted
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
export default { mixins: [JobMixin] };
</script>