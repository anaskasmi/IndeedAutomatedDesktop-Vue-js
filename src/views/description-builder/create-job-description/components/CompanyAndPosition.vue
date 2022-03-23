<template >
  <div>
    <v-row align="center" class="col-12">
      <v-col cols="6">
        <v-text-field
          hide-details
          clearable
          solo-inverted
          light
          autocomplete="nope"
          label="company name"
          v-model="job.company.name"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          hide-details
          autocomplete="nope"
          clearable
          solo-inverted
          light
          label="company website"
          v-model="job.company.website"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" class="col-12">
      <v-col cols="1"> In </v-col>
      <v-col>
        <v-text-field
          hide-details
          clearable
          solo-inverted
          light
          v-model="job.company.city"
          label="City"
          autocomplete="nope"
        ></v-text-field
      ></v-col>

      <v-col>
        <v-text-field
          hide-details
          clearable
          solo-inverted
          light
          v-model="job.company.state"
          label="State"
          autocomplete="nope"
        ></v-text-field>
      </v-col>
      ,
    </v-row>
    <v-row align="center" class="col-12">
      <v-col cols="2"> Is Seeking </v-col>
      <v-col>
        <JobTypeInput isSoloInverted />
      </v-col>
      <v-col>
        <RoleDescriptionInput isSoloInverted />
      </v-col>
      <v-col>
        <PositionsInput isSoloInverted />
      </v-col>
      .
    </v-row>
  </div>
</template>
<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
import RoleDescriptionInput from "@/views/description-builder/create-job-description/components/items-inputs/RoleDescriptionInput.vue";
import JobTypeInput from "@/views/description-builder/create-job-description/components/items-inputs/JobTypeInput.vue";
import PositionsInput from "@/views/description-builder/create-job-description/components/items-inputs/PositionsInput.vue";

export default {
  components: {
    RoleDescriptionInput,
    JobTypeInput,
    PositionsInput,
  },
  mixins: [JobMixin],
};
</script>