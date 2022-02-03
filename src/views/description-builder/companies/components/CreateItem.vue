<template>
  <v-dialog v-model="createItemDialogVisible" max-width="490">
    <v-card :loading="isLoading" rounded="lg">
      <v-card-title> New Item </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="item.name"
          filled
          label="Item name"
        ></v-text-field>
        <v-btn
          @click="createItem"
          :loading="isLoading"
          :disabled="isLoading || !item.name"
          tile
          block
          color="primary"
          >Create</v-btn
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
      item: {
        name: null,
      },
    };
  },
  methods: {
    async createItem() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderPositionsModule/createPositionItem",
          this.item
        );
        this.item.name = null;
        this.createItemDialogVisible = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    createItemDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderPositionsModule/createItemDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderPositionsModule/createItemDialogVisible",
          newVal
        );
      },
    },
  },
};
</script>

