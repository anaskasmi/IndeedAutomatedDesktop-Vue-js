<template>
  <v-dialog persistent v-model="createSetDialogVisible" max-width="690">
    <v-card :loading="isLoading" rounded="lg">
      <v-card-title> New Set </v-card-title>
      <v-card-text>
        <v-text-field v-model="set.name" filled label="Set name"></v-text-field>
        <v-autocomplete
          chips
          dense
          clearable
          deletable-chips
          multiple
          filled
          v-model="set.positions"
          small-chips
          :items="items"
          color="blue-grey lighten-2"
          label="Select set items"
          item-text="name"
          item-value="_id"
        ></v-autocomplete>
        <v-btn
          @click="createSet"
          :loading="isLoading"
          :disabled="isLoading || !set.name || !set.positions.length"
          tile
          block
          color="primary"
          class="my-2"
          >Create Set</v-btn
        ><v-btn
          @click="createSetDialogVisible = false"
          :loading="isLoading"
          :disabled="isLoading"
          tile
          block
          color="grey"
          outlined
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
      set: {
        name: null,
        positions: [],
      },
    };
  },
  methods: {
    async createSet() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderPositionsModule/createSet",
          this.set
        );
        this.set.name = null;
        this.set.positions = [];
        this.createSetDialogVisible = false;
        this.$store.commit("showSuccessNotification", "Created successfully!");
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    items: {
      get: function () {
        return this.$store.getters["DescriptionBuilderPositionsModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderPositionsModule/items", newVal);
      },
    },
    createSetDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderPositionsModule/createSetDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderPositionsModule/createSetDialogVisible",
          newVal
        );
      },
    },
  },
};
</script>

