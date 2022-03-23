<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Tag(s) :
      </div>
      <v-row align="center" class="col-12"> <TagsInput /> </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import TagsInput from "@/views/description-builder/create-job-description/components/sets-inputs/TagsInput.vue";

export default {
  components: {
    TagsInput,
  }, 
  mixins: [TagsInput],
};
</script>