<template>
  <v-dialog persistent v-model="updateDialogVisible" max-width="490">
    <v-card :loading="isLoading" :disabled="isLoading" rounded="lg">
      <v-card-title> Update Posting </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="postingUnderUpdate.name"
          filled
          label="Name"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="postingUnderUpdate.website"
          filled
          label="Website"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="postingUnderUpdate.culture"
          filled
          label="Culture"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="postingUnderUpdate.state"
          filled
          label="State"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="postingUnderUpdate.city"
          filled
          label="City"
          clearable
        ></v-text-field>

        <v-textarea
          v-model="postingUnderUpdate.description"
          filled
          label="Description"
          clearable
        ></v-textarea>
        <v-btn
          @click="updatePosting"
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
    async updatePosting() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderPostingsModule/updatePosting",
          this.postingUnderUpdate
        );
        this.postingUnderUpdate = {};
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
        this.postingUnderUpdate.name &&
        this.postingUnderUpdate.website &&
        this.postingUnderUpdate.description &&
        this.postingUnderUpdate.culture &&
        this.postingUnderUpdate.city &&
        this.postingUnderUpdate.state
      );
    },
    getAllStates() {
      return State.getStatesOfCountry("US");
    },
    getCitiesOfState() {
      return City.getCitiesOfState("US", this.postingUnderUpdate.state);
    },

    updateDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderPostingsModule/updateDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderPostingsModule/updateDialogVisible",
          newVal
        );
      },
    },
    postingUnderUpdate: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderPostingsModule/postingUnderUpdate"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderPostingsModule/postingUnderUpdate",
          newVal
        );
      },
    },
  },
};
</script>

