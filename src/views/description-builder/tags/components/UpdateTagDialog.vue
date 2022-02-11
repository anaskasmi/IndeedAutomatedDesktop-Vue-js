<template>
  <v-dialog persistent v-model="updateDialogVisible" max-width="490">
    <v-card :loading="isLoading" :disabled="isLoading" rounded="lg">
      <v-card-title> Update Tag </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="tagUnderUpdate.name"
          filled
          label="Name"
          clearable
        ></v-text-field>
      
        <v-textarea
          v-model="tagUnderUpdate.content"
          filled
          label="Content"
          clearable
        ></v-textarea>
        <v-btn
          @click="updateTag"
          :loading="isLoading"
          :disabled="isLoading || !allDataFilled"
          tile
          block
          color="primary"
          >Update</v-btn
        >
        <v-btn
          outlined
          @click="updateDialogVisible = false"
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
import { State, City } from "country-state-city";

export default {
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async updateTag() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderTagsModule/updateTag",
          this.tagUnderUpdate
        );
        this.tagUnderUpdate = {};
        this.updateDialogVisible = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    allDataFilled() {
      return (
        this.tagUnderUpdate.name &&
        this.tagUnderUpdate.content 
      );
    },
    getAllStates() {
      return State.getStatesOfCountry("US");
    },
    getCitiesOfState() {
      return City.getCitiesOfState("US", this.tagUnderUpdate.state);
    },

    updateDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTagsModule/updateDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTagsModule/updateDialogVisible",
          newVal
        );
      },
    },
    tagUnderUpdate: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTagsModule/tagUnderUpdate"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTagsModule/tagUnderUpdate",
          newVal
        );
      },
    },
  },
};
</script>

