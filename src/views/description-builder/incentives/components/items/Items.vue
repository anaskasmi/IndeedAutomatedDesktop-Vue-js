<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <CreateItemDialog />
    <v-card-title style="color: #30475e">Incentives Items</v-card-title>
    <v-card-text class="pa-12">
      <v-data-table
        :headers="headers"
        :items="items"
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
            ></v-text-field>
            <v-btn
              dark
              color="#30475e"
              @click="createItemDialogVisible = true"
              class="my-6"
              small
              fab
              ><v-icon medium>mdi-plus</v-icon></v-btn
            >
          </v-row>
        </template>
        <template class="align-center" v-slot:[`item.name`]="{ item }">
          <EditableText :item="item" />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium color="red darken-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import EditableText from "@/views/description-builder/incentives/components/items/Editable.vue";
import CreateItemDialog from "@/views/description-builder/incentives/components/items/CreateItem.vue";
export default {
  created() {
    this.fetchItems();
  },
  components: {
    EditableText,
    CreateItemDialog,
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
    items: {
      get: function () {
        return this.$store.getters["DescriptionBuilderIncentivesModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderIncentivesModule/items", newVal);
      },
    },
    createItemDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderIncentivesModule/createItemDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderIncentivesModule/createItemDialogVisible",
          newVal
        );
      },
    },
  },
  methods: {
    async fetchItems() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderIncentivesModule/fetchIncentivesItems"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteItem(item) {
      this.$swal
        .fire({
          title: "This Item will be deleted, continue ?",
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
                "DescriptionBuilderIncentivesModule/deleteIncentiveItem",
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