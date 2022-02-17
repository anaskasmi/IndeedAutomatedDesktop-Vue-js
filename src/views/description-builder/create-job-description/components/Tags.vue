<template >
  <v-row align="center" class="col-12 mb-2">
    <div class="my-0 mr-4">Tags(s) :</div>
    <TagsInput isSoloInverted />
  </v-row>
</template>
<script>
import TagsInput from "@/views/description-builder/create-job-description/components/inputs/TagsInput.vue";

export default {
  components: {
    TagsInput,
  },
  mixins: [TagsInput],
};
</script>