<template>
  <v-card
    elevation="0"
    rounded="lg"
    class="my-4"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <CreateCompanyDialog />
    <UpdateCompanyDialog />
    <v-card-title style="color: #30475e">Companies</v-card-title>
    <v-card-text class="pa-12">
      <v-data-table
        :headers="headers"
        :items="companies"
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
        <template class="align-center" v-slot:[`item.description`]="{ item }">
          <div style="text-align: justify">
            {{ item.description }}
          </div>
        </template>
        <template class="align-center" v-slot:[`item.culture`]="{ item }">
          <div style="text-align: justify">
            {{ item.culture }}
          </div>
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
          <v-icon medium color="red darken-2" @click="deleteCompany(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import CreateCompanyDialog from "@/views/description-builder/companies/components/CreateCompanyDialog.vue";
import UpdateCompanyDialog from "@/views/description-builder/companies/components/UpdateCompanyDialog.vue";
export default {
  created() {
    this.fetchCompanies();
  },
  components: {
    CreateCompanyDialog,
    UpdateCompanyDialog,
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
          text: "description",
          align: "start",
          sortable: true,
          value: "description",
          width: "40%",
        },
        {
          text: "website",
          align: "start",
          sortable: true,
          value: "website",
        },
        {
          text: "culture",
          align: "start",
          sortable: true,
          value: "culture",
        },
        {
          text: "city",
          align: "start",
          sortable: true,
          value: "city",
        },
        {
          text: "state",
          align: "start",
          sortable: true,
          value: "state",
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
    companies: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderCompaniesModule/companies"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderCompaniesModule/companies",
          newVal
        );
      },
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
  methods: {
    async fetchCompanies() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderCompaniesModule/fetchCompanies"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    editItem(company) {
      this.companyUnderUpdate = company;
      this.updateDialogVisible = true;
    },
    async deleteCompany(item) {
      this.$swal
        .fire({
          title: "This Company will be deleted, continue ?",
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
                "DescriptionBuilderCompaniesModule/deleteCompany",
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