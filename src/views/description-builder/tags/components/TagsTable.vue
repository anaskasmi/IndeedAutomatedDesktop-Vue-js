<template>
  <v-card
    elevation="0"
    rounded="lg"
    class="my-4"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <CreateTagDialog />
    <UpdateTagDialog />
    <v-card-title style="color: #30475e">Tags</v-card-title>
    <v-card-text class="pa-12">
      <v-data-table
        :headers="headers"
        :items="tags"
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
          <v-icon medium color="red darken-2" @click="deleteTag(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import CreateTagDialog from "@/views/description-builder/tags/components/CreateTagDialog.vue";
import UpdateTagDialog from "@/views/description-builder/tags/components/UpdateTagDialog.vue";
export default {
  created() {
    this.fetchTags();
  },
  components: {
    CreateTagDialog,
    UpdateTagDialog,
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
          text: "content",
          align: "start",
          sortable: true,
          value: "content",
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
    tags: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTagsModule/tags"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTagsModule/tags",
          newVal
        );
      },
    },
    createDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTagsModule/createDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTagsModule/createDialogVisible",
          newVal
        );
      },
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
  methods: {
    async fetchTags() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderTagsModule/fetchTags"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    editItem(tag) {
      this.tagUnderUpdate = tag;
      this.updateDialogVisible = true;
    },
    async deleteTag(item) {
      this.$swal
        .fire({
          title: "This Tag will be deleted, continue ?",
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
                "DescriptionBuilderTagsModule/deleteTag",
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