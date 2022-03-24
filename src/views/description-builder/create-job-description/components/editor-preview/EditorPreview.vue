<template>
  <div class="col-12 pa-0">
    <v-card :outlined="showActions" elevation="0">
      <v-card-title v-if="showActions">
        <v-row class="col-12" justify="space-between">
          <div>Preview</div>
          <div>
            <v-btn dark depressed color="green" @click="copyDescription">
              <v-icon class="mr-2" small>mdi-content-copy</v-icon>
              Copy
            </v-btn>
            <v-btn depressed dark class="ml-2" color="info">
              <v-icon class="mr-2" small>mdi-file-download</v-icon>
              Save Job
            </v-btn>
          </div>
        </v-row>
      </v-card-title>
      <v-divider v-if="showActions"></v-divider>
      <v-card-text>
        <ckeditor :value="description" :config="editorConfig"></ckeditor>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import jobDescriptionMixin from "@/views/description-builder/create-job-description/mixins/jobDescriptionMixin.js";
export default {
  mixins: [jobDescriptionMixin],
  props: ["postings", "showActions"],
  data: () => {
    return {
      editorConfig: {
        toolbar: [["Bold"], ["Italic"], ["BulletedList"]],
        copyFormatting_allowedContexts: true,
      },
    };
  },
};
</script>