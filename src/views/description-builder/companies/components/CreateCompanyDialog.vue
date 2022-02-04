<template>
  <v-dialog persistent v-model="createDialogVisible" max-width="490">
    <v-card :loading="isLoading" rounded="lg">
      <v-card-title> New Company </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="companyData.name"
          filled
          label="Name"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="companyData.website"
          filled
          label="Website"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="companyData.culture"
          filled
          label="Culture"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="companyData.state"
          filled
          label="State"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="companyData.city"
          filled
          label="City"
          clearable
        ></v-text-field>
        <v-textarea
          v-model="companyData.description"
          filled
          label="Description"
          clearable
        ></v-textarea>
        <v-btn
          @click="createCompany"
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
import { State, City } from "country-state-city";

export default {
  data() {
    return {
      isLoading: false,
      companyData: {},
    };
  },
  methods: {
    async createCompany() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderCompaniesModule/createCompany",
          this.companyData
        );
        this.companyData = {};
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
      return (
        this.companyData.name &&
        this.companyData.website &&
        this.companyData.description &&
        this.companyData.culture &&
        this.companyData.city &&
        this.companyData.state
      );
    },
    getAllStates() {
      return State.getStatesOfCountry("US");
    },
    getCitiesOfState() {
      console.log(this.companyData.state);
      console.log(City.getCitiesOfState("US", this.companyData.state));
      return City.getCitiesOfState("US", this.companyData.state);
    },

    createDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderCompaniesModule/createDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderCompaniesModule/createDialogVisible",
          newVal
        );
      },
    },
  },
};
</script>

