<template>
  <v-dialog persistent v-model="viewPostingDialogVisible" max-width="490">
    <v-card :loading="isLoading" :disabled="isLoading" rounded="lg">
      <v-card-title> {{ posting.name }} </v-card-title>
      <v-card-text>
        <EditorPreview :job="posting" />

        <v-btn
          outlined
          @click="viewPostingDialogVisible = false"
          :loading="isLoading"
          :disabled="isLoading"
          class="mt-2"
          tile
          block
          color="grey"
          >Close</v-btn
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import EditorPreview from "@/views/description-builder/create-job-description/components/editor-preview/EditorPreview.vue";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: { EditorPreview },
  props: ["posting"],
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

