<template>
  <v-dialog persistent v-model="viewPostingDialogVisible" fullscreen>
    <v-card :loading="isLoading" :disabled="isLoading" rounded="lg">
      <v-card-title>
        <v-row no-gutters justify="space-between">
          {{ postings.name }}
          <v-btn
            @click="viewPostingDialogVisible = false"
            dark
            text
            color="red"
            fab
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row class="col-12" no-gutters>
          <v-btn
            @click="copyDescription"
            :loading="isLoading"
            :disabled="isLoading"
            class="mt-2"
            tile
            block
            large
            color="success"
            ><v-icon class="mr-4">mdi-content-copy</v-icon> COPY DESCRIPTION</v-btn
          >
        </v-row>
        <EditorPreview :postings="postings" :showActions="false" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import EditorPreview from "@/views/description-builder/create-job-description/components/editor-preview/EditorPreview.vue";
import jobDescriptionMixin from "@/views/description-builder/create-job-description/mixins/jobDescriptionMixin.js";
export default {
  mixins: [jobDescriptionMixin],
  data() {
    return {
      isLoading: false,
    };
  },
  components: { EditorPreview },
  props: ["postings"],
  computed: {
    viewPostingDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderPostingsModule/viewPostingDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderPostingsModule/viewPostingDialogVisible",
          newVal
        );
      },
    },
  },
};
</script>

