<template>
  <v-dialog persistent v-model="createDialogVisible" max-width="490">
    <v-card :loading="isLoading" rounded="lg">
      <v-card-title> New Tag </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="tagData.name"
          filled
          label="Name"
          clearable
        ></v-text-field>
        <v-textarea
          v-model="tagData.content"
          filled
          label="Content"
          clearable
        ></v-textarea>
        <v-btn
          @click="createTag"
          :loading="isLoading"
          :disabled="isLoading || !allDataFilled"
          tile
          block
          color="primary"
          >Create</v-btn
        >
        <v-btn
          outlined
          @click="createDialogVisible = false"
          :loading="isLoading"
          :disabled="isLoading"
          class="mt-2"
          tile
          block
          color="grey"
          >Cancel</v-btn
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  data() {
    return {
      isLoading: false,
      tagData: {},
    };
  },
  methods: {
    async createTag() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderTagsModule/createTag",
          this.tagData
        );
        this.tagData = {};
        this.createDialogVisible = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    allDataFilled() {
      return this.tagData.name && this.tagData.content;
    },

    createDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTagsModule/createDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTagsModule/createDialogVisible",
          newVal
        );
      },
    },
  },
};
</script>

