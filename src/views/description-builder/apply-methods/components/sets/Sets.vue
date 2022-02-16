<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <CreateSetDialog />
    <v-card-title style="color: #30475e">Apply Methods Sets</v-card-title>
    <v-card-text class="pa-12">
      <v-data-table
        :headers="headers"
        :items="sets"
        class="elevation-0"
        :search="search"
        :expanded.sync="expanded"
        item-key="_id"
        show-expand
        @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
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
              @click="createSetDialogVisible = true"
              class="my-6"
              small
              fab
              ><v-icon medium>mdi-plus</v-icon></v-btn
            >
          </v-row>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <EditableText :set="item" />
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium color="red darken-2" @click="deleteSet(item)">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:expanded-item="{ item }">
          <div class="my-6" v-if="theSetUnderUpdate != item._id">
            <v-chip
              v-for="applyMethod in item.applyMethods"
              class="ml-4 my-1"
              :key="applyMethod._id"
              :color="itemIdUnderDelete == applyMethod._id ? 'red' : 'info'"
              close
              :small="itemIdUnderDelete != applyMethod._id"
              :medium="itemIdUnderDelete == applyMethod._id"
              :close-icon="
                itemIdUnderDelete == applyMethod._id ? 'mdi-close' : 'mdi-delete'
              "
              text-color="white"
              @click:close="deleteItemFromSet(item._id, applyMethod._id)"
            >
              {{ applyMethod.name }}
            </v-chip>
            <v-btn
              @click="openUpdateSetMode(item._id)"
              fab
              x-small
              depressed
              class="ma-2 white--text"
              color="#082032"
            >
              <v-icon color="white">mdi-pencil-plus</v-icon>
            </v-btn>
          </div>

          <v-card
            color="#082032"
            dark
            elevation="0"
            rounded="lg"
            class="col-12 ma-12"
            v-if="theSetUnderUpdate == item._id"
          >
            <v-card-title class="my-4 font-weight-bold text-uppercase"
              >Editing : {{ item.name }}
            </v-card-title>

            <v-card-text>
              <v-row justify="center" align="center">
                <v-autocomplete
                  chips
                  dense
                  clearable
                  deletable-chips
                  multiple
                  filled
                  v-model="item.applyMethods"
                  small-chips
                  :items="items"
                  color="blue-grey lighten-2"
                  label="Select"
                  item-text="name"
                  item-value="_id"
                ></v-autocomplete>
              </v-row>
              <div>
                <v-btn
                  class="my-2"
                  @click="updateSet(item)"
                  block
                  tile
                  dark
                  color="#4B6587"
                  >Update</v-btn
                >
                <v-btn
                  block
                  tile
                  outlined
                  dark
                  color="grey"
                  @click="cancelUpdateSetMode"
                  >Cancel</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import EditableText from "@/views/description-builder/apply-methods/components/sets/Editable.vue";
import CreateSetDialog from "@/views/description-builder/apply-methods/components/sets/CreateSet.vue";
export default {
  created() {
    this.fetchSets();
  },
  components: {
    EditableText,
    CreateSetDialog,
  },
  data() {
    return {
      itemIdUnderDelete: null,
      theSetUnderUpdate: null,
      expanded: [],
      isLoading: false,
      search: null,
      headers: [
        {
          text: "set name",
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
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  computed: {
    sets: {
      get: function () {
        return this.$store.getters["DescriptionBuilderApplyMethodsModule/sets"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderApplyMethodsModule/sets", newVal);
      },
    },
    items: {
      get: function () {
        return this.$store.getters["DescriptionBuilderApplyMethodsModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderApplyMethodsModule/items", newVal);
      },
    },

    createSetDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderApplyMethodsModule/createSetDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderApplyMethodsModule/createSetDialogVisible",
          newVal
        );
      },
    },
  },
  methods: {
    async openUpdateSetMode(setId) {
      this.theSetUnderUpdate = setId;
    },
    async cancelUpdateSetMode() {
      try {
        await this.$store.dispatch(
          "DescriptionBuilderApplyMethodsModule/fetchSets"
        );
      } catch (error) {
        console.log(error);
        this.$store.commit("showErrorNotification", error);
      } finally {
        this.isLoading = false;
        this.theSetUnderUpdate = null;
        this.itemIdUnderDelete = null;
      }
    },
    async updateSet(set) {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderApplyMethodsModule/updateSet",
          set
        );
        this.$store.commit("showSuccessNotification", "Updated successfully!");
      } catch (error) {
        console.log(error);
        this.$store.commit("showErrorNotification", error);
      } finally {
        this.isLoading = false;
        this.theSetUnderUpdate = null;
        this.itemIdUnderDelete = null;
      }
    },
    async deleteItemFromSet(setId, itemId) {
      if (this.itemIdUnderDelete != itemId) {
        this.itemIdUnderDelete = itemId;
        return;
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderApplyMethodsModule/deleteItemFromSet",
          { setId, itemId }
        );
        this.$store.commit("showSuccessNotification", "Deleted successfully!");
      } catch (error) {
        console.log(error);
        this.$store.commit("showErrorNotification", error);
      } finally {
        this.isLoading = false;
        this.itemIdUnderDelete = null;
      }
    },
    async fetchSets() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderApplyMethodsModule/fetchSets"
        );
      } catch (error) {
        console.log(error);
        this.$store.commit("showErrorNotification", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteSet(set) {
      this.$swal
        .fire({
          title: "This Set will be deleted, continue ?",
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
                "DescriptionBuilderApplyMethodsModule/deleteSet",
                set._id
              );
              this.$swal.fire({
                title: "Deleted successfully",
                icon: "success",
                confirmButtonColor: "#219F94",
              });
            } catch (error) {
              console.log(error);
              this.$store.commit("showErrorNotification", error);
            } finally {
              this.isLoading = false;
            }
          }
        });
    },
  },
};
</script>