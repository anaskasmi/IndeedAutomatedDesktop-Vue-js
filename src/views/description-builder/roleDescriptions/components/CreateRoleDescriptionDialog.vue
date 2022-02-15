<template>
  <v-dialog persistent v-model="createDialogVisible" max-width="490">
    <v-card :loading="isLoading" rounded="lg">
      <v-card-title> New Role Description </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="roleDescriptionData.name"
          filled
          label="Name"
          clearable
        ></v-text-field>

        <v-btn
          @click="createRoleDescription"
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
      roleDescriptionData: {},
    };
  },
  methods: {
    async createRoleDescription() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderRoleDescriptionsModule/createRoleDescription",
          this.roleDescriptionData
        );
        this.roleDescriptionData = {};
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
      return this.roleDescriptionData.name;
    },

    createDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderRoleDescriptionsModule/createDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderRoleDescriptionsModule/createDialogVisible",
          newVal
        );
      },
    },
  },
};
</script>

