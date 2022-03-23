<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        I'm promoting for the company :
      </div>
      <CompanyInput />
    </v-card-text>
  </v-card>
</template>
<script>
import CompanyInput from "@/views/description-builder/create-job-description/components/items-inputs/CompanyInput.vue";

export default {
  components: {
    CompanyInput,
  },
};
</script>