<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Can you describe your candidate in one word :
      </div>
      <v-row align="center" class="col-12"> <RoleDescriptionInput /> </v-row>
    </v-card-text>
  </v-card>
</template><script>
import RoleDescriptionInput from "@/views/description-builder/create-job-description/components/inputs/RoleDescriptionInput.vue";
export default {
  components: {
    RoleDescriptionInput,
  },
};
</script>