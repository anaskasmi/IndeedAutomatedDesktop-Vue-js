<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Position(s) :</div>
    <PositionsInput isSoloInverted />
  </v-row>
</template>

<script>
import PositionsInput from "@/views/description-builder/create-job-description/components/items-inputs/PositionsInput.vue";

export default {
  components: {
    PositionsInput,
  },
};
</script>