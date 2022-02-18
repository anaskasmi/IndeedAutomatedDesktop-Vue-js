<template>
  <v-card
    elevation="0"
    rounded="lg"
    class="my-4"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <ViewPostingDialog />
    <v-card-title style="color: #30475e">Postings</v-card-title>
    <v-card-text class="pa-12">
      <v-row class="col-12">
        <v-card
          class="col-sm-12 col-ms-4 col-lg-3 mx-2"
          v-for="posting in postings"
          :key="posting._id"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1" style="color: #2e4c6d">
                <v-row class="col-12" justify="space-between">
                  {{ posting.name }}
                  <v-spacer />
                  <v-btn color="success" outlined> Copy </v-btn>
                </v-row>
              </v-list-item-title>
              <v-divider class="my-2"></v-divider>
              <v-list-item-subtitle v-if="posting.company">
                {{ posting.company.name }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="posting.company">
                {{ posting.company.city }}, {{ posting.company.state }}
              </v-list-item-subtitle>
              <div v-for="set in posting.positions" :key="set._id">
                <v-chip
                  small
                  color="#2e4c6d"
                  outlined
                  class="my-1 mr-1 akaya"
                  v-for="item in set.positions"
                  :key="item._id"
                >
                  {{ item.name }}
                </v-chip>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions class="float-right">
            <v-btn rounded text color="red"> Delete </v-btn>
            <v-btn depressed color="info"> Full Posting </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ViewPostingDialog from "@/views/description-builder/postings/components/ViewPostingDialog.vue";
export default {
  created() {
    this.fetchPostings();
  },
  components: {
    ViewPostingDialog,
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
    postings: {
      get: function () {
        return this.$store.getters["DescriptionBuilderPostingsModule/postings"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderPostingsModule/postings", newVal);
      },
    },
    createDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderPostingsModule/createDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderPostingsModule/createDialogVisible",
          newVal
        );
      },
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
  methods: {
    async fetchPostings() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderPostingsModule/fetchPostings"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    editItem(posting) {
      this.postingUnderUpdate = posting;
      this.updateDialogVisible = true;
    },
    async deletePosting(item) {
      this.$swal
        .fire({
          title: "This Posting will be deleted, continue ?",
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
                "DescriptionBuilderPostingsModule/deletePosting",
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