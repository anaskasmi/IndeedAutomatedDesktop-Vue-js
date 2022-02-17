<template >
   <v-row align="center" class="col-12" justify="center">
      <v-switch dense class="mr-4"  v-model="job.showSignature" inset label="Signature"></v-switch>
      <v-text-field
        autocomplete="nope"
        label="signature"
        solo-inverted
        hide-details
        clearable
        light
        v-model="job.signature"
      ></v-text-field>
    </v-row></template>

<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
export default {
  mixins: [JobMixin],
};
</script>