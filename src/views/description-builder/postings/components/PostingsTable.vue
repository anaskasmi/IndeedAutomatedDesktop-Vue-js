<template>
  <v-card
    elevation="0"
    rounded="lg"
    class="my-4"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <ViewPostingDialog :postings="openedPosting" />
    <v-card-title style="color: #30475e">Saved Job Postings</v-card-title>
    <v-card-text class="pa-12">
      <v-row class="col-12" no-gutters justify="center">
        <v-card
          style="box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px"
          class="grow col-sm-9 col-md-9 col-lg-9 ma-8"
          v-for="posting in postings"
          :key="posting._id"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1" style="color: #2e4c6d">
                <v-row no-gutters justify="space-between">
                  <span>
                    {{ posting.name }}
                  </span>

                  <v-btn
                    color="success"
                    text
                    depressed
                    fab
                    @click="copyDescription"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-title>
              <v-divider class="my-2"></v-divider>
              <v-list-item-subtitle v-if="posting.company">
                {{ posting.company.name }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="posting.company">
                {{ posting.company.city }}, {{ posting.company.state }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="float-right">
            <v-btn rounded text color="red" @click="deletePosting(posting._id)">
              Delete
            </v-btn>
            <v-btn depressed color="info" @click="openPosting(posting)">
              Full Posting
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ViewPostingDialog from "@/views/description-builder/postings/components/ViewPostingDialog.vue";
import jobDescriptionMixin from "@/views/description-builder/create-job-description/mixins/jobDescriptionMixin.js";
export default {
  mixins: [jobDescriptionMixin],
  created() {
    this.fetchPostings();
  },
  components: {
    ViewPostingDialog,
  },
  data() {
    return {
      isLoading: false,
      openedPosting: {},
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
    viewPostingDialogVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderPostingsModule/viewPostingDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderPostingsModule/viewPostingDialogVisible",
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

    openPosting(posting) {
      this.viewPostingDialogVisible = true;
      this.openedPosting = posting;
    },
    async deletePosting(_id) {
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
                _id
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