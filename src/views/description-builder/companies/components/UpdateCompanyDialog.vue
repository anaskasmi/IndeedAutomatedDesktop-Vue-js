<template>
  <v-dialog persistent v-model="updateDialogVisible" max-width="490">
    <v-card :loading="isLoading" :disabled="isLoading" rounded="lg">
      <v-card-title> Update Company </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="companyUnderUpdate.name"
          filled
          label="Name"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="companyUnderUpdate.website"
          filled
          label="Website"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="companyUnderUpdate.culture"
          filled
          label="Culture"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="companyUnderUpdate.state"
          filled
          label="State"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="companyUnderUpdate.city"
          filled
          label="City"
          clearable
        ></v-text-field>

        <v-textarea
          v-model="companyUnderUpdate.description"
          filled
          label="Description"
          clearable
        ></v-textarea>
        <v-btn
          @click="updateCompany"
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
    async updateCompany() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderCompaniesModule/updateCompany",
          this.companyUnderUpdate
        );
        this.companyUnderUpdate = {};
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
        this.companyUnderUpdate.name &&
        this.companyUnderUpdate.website &&
        this.companyUnderUpdate.description &&
        this.companyUnderUpdate.culture &&
        this.companyUnderUpdate.city &&
        this.companyUnderUpdate.state
      );
    },
    getAllStates() {
      return State.getStatesOfCountry("US");
    },
    getCitiesOfState() {
      return City.getCitiesOfState("US", this.companyUnderUpdate.state);
    },

    updateDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderCompaniesModule/updateDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderCompaniesModule/updateDialogVisible",
          newVal
        );
      },
    },
    companyUnderUpdate: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderCompaniesModule/companyUnderUpdate"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderCompaniesModule/companyUnderUpdate",
          newVal
        );
      },
    },
  },
};
</script>

