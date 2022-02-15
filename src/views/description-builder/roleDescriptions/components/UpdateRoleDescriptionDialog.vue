<template>
  <v-dialog persistent v-model="updateDialogVisible" max-width="490">
    <v-card :loading="isLoading" :disabled="isLoading" rounded="lg">
      <v-card-title> Update Role Description </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="roleDescriptionUnderUpdate.name"
          filled
          label="Name"
          clearable
        ></v-text-field>
        <v-btn
          @click="updateRoleDescription"
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
export default {
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async updateRoleDescription() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "DescriptionBuilderRoleDescriptionsModule/updateRoleDescription",
          this.roleDescriptionUnderUpdate
        );
        this.roleDescriptionUnderUpdate = {};
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
      return this.roleDescriptionUnderUpdate.name;
    },

    updateDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderRoleDescriptionsModule/updateDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderRoleDescriptionsModule/updateDialogVisible",
          newVal
        );
      },
    },
    roleDescriptionUnderUpdate: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptionUnderUpdate"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptionUnderUpdate",
          newVal
        );
      },
    },
  },
};
</script>

