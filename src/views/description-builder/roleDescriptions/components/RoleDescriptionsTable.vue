<template>
  <v-card
    elevation="0"
    rounded="lg"
    class="my-4"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <CreateRoleDescriptionDialog />
    <UpdateRoleDescriptionDialog />
    <v-card-title style="color: #30475e">Roles Descriptions</v-card-title>
    <v-card-text class="pa-12">
      <v-data-table
        :headers="headers"
        :items="roleDescriptions"
        item-key="id"
        class="elevation-0"
        :search="search"
      >
        <template v-slot:top>
          <v-row>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
              color="#30475e"
            >
            </v-text-field>
            <v-btn
              dark
              color="#30475e"
              @click="createDialogVisible = true"
              class="my-6"
              small
              fab
            >
              <v-icon medium>mdi-plus</v-icon>
            </v-btn>
          </v-row>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="mr-2"
            medium
            color="green darken-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            medium
            color="red darken-2"
            @click="deleteRoleDescription(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import CreateRoleDescriptionDialog from "@/views/description-builder/roleDescriptions/components/CreateRoleDescriptionDialog.vue";
import UpdateRoleDescriptionDialog from "@/views/description-builder/roleDescriptions/components/UpdateRoleDescriptionDialog.vue";
export default {
  created() {
    this.fetchRoleDescriptions();
  },
  components: {
    CreateRoleDescriptionDialog,
    UpdateRoleDescriptionDialog,
  },
  data() {
    return {
      isLoading: false,
      search: null,
      headers: [
        {
          text: "name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "actions",
          align: "end",
          sortable: true,
          value: "actions",
          width: "10%",
        },
      ],
    };
  },
  computed: {
    roleDescriptions: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptions"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptions",
          newVal
        );
      },
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
  methods: {
    async fetchRoleDescriptions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderRoleDescriptionsModule/fetchRoleDescriptions"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    editItem(roleDescription) {
      this.roleDescriptionUnderUpdate = roleDescription;
      this.updateDialogVisible = true;
    },
    async deleteRoleDescription(item) {
      this.$swal
        .fire({
          title: "This RoleDescription will be deleted, continue ?",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: `Cancel`,
          confirmButtonColor: "#E05D5D",
          cancelButtonColor: "#ddd",
          icon: "error",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            try {
              await this.$store.dispatch(
                "DescriptionBuilderRoleDescriptionsModule/deleteRoleDescription",
                item._id
              );
              this.$swal.fire({
                title: "Deleted successfully",
                icon: "success",
                confirmButtonColor: "#219F94",
              });
            } catch (error) {
              this.$store.dispatch("alertsModule/fireAxiosError", error);
            } finally {
              this.isLoading = false;
            }
          }
        });
    },
  },
};
</script>