<template>
  <!-- transfer dialog -->
  <v-card tile>
    <v-card-text>
      <div class="text-center py-12">
        <v-alert
          color="info"
          border="left"
          elevation="1"
          class="mb-8"
          colored-border
          icon="mdi-calendar"
          v-if="startDate && endDate"
        >
          <span class="font-weight-bold grey--text text--darken-2">
            Selected Date range : {{ startDate }} ~ {{ endDate }}
          </span>
        </v-alert>
        <br />
        <v-row justify="center" align="center">
          <v-col>
            <div class="font-weight-bold grey--text text--darken-2 my-2">
              Start Date
            </div>
            <v-date-picker
              full-width
              v-model="startDate"
              elevation="2"
              title="Start Date"
            ></v-date-picker>
          </v-col>
          <v-col>
            <div class="font-weight-bold grey--text text--darken-2 my-2">
              End Date
            </div>
            <v-date-picker
              full-width
              v-model="endDate"
              elevation="2"
              title="End Date"
              :min="startDate"
            ></v-date-picker>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mx-2">
          <v-btn
            large
            tile
            block
            color="success"
            class="my-10"
            :loading="isGettingCandidates"
            :disabled="isGettingCandidates || !startDate || !endDate"
            @click="fetchCandidatesByDate"
          >
            Get Candidates
          </v-btn>
        </v-row>
        <hr class="col-6 mx-auto my-10" />
        <div v-if="candidatesBetweenTwoDates.length > 0">
          <v-row justify="center" align="center" class="my-2">
            <h1
              class="
                font-weight-medium
                text-center
                grey--text
                text--darken-2
                my-2
              "
            >
              {{ candidatesBetweenTwoDates.length }} Candidates found
            </h1>
          </v-row>
          <v-row justify="center" align="center" class="my-6">
            <v-btn
              color="info"
              tile
              @click="transferResumesOfCandidatesList"
              :disabled="candidatesListUnderTransfer"
              :loading="candidatesListUnderTransfer"
            >
              Transfer All
            </v-btn>
          </v-row>
        </div>
        <v-tabs
          grow
          background-color="primary"
          dark
          align-with-title
          v-model="currentTab"
          class="my-10"
        >
          <v-tab>Grid</v-tab>
          <v-tab>Table</v-tab>
        </v-tabs>

        <v-tabs-items
          v-model="currentTab"
          style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          class="pa-6"
        >
          <v-tab-item>
            <div style="min-height: 300px">
              <v-alert
                v-if="
                  !candidatesBetweenTwoDates ||
                  candidatesBetweenTwoDates.length == 0
                "
                type="warning"
                width="100%"
              >
                No candidates fetched
              </v-alert>
              <v-row
                :class="{
                  'grid-wrapper-sm': $vuetify.breakpoint.mdAndDown,
                  'grid-wrapper-md': $vuetify.breakpoint.mdAndUp,
                }"
              >
                <div
                  v-for="candidate in candidatesBetweenTwoDates"
                  :key="candidate.candidateId"
                >
                  <v-card class="text-center pa-4">
                    <v-card-text class="text-center">
                      <img
                        class="candidate-image"
                        src="@/assets/img/undraw_profile_pic_ic5t.svg"
                        alt=""
                      />
                    </v-card-text>
                    <v-card-title class="justify-center">{{
                      candidate.name
                    }}</v-card-title>

                    <v-card-actions>
                      <v-btn
                        color="blue"
                        outlined
                        block
                        @click="transferResumeOfOneCandidate(candidate)"
                        :disabled="candidateIdUnderTransfer != null"
                        :loading="
                          candidateIdUnderTransfer == candidate.candidateId
                        "
                      >
                        Transfer Resume
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </v-row>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div style="min-height: 300px">
              You have {{ selectedCandidates.length }} selected Candidates
              <v-row justify="center" align="center" class="my-6">
                <v-btn
                  color="info"
                  tile
                  @click="transferResumesOfCandidatesList(true)"
                  :disabled="
                    !selectedCandidates.length || candidatesListUnderTransfer
                  "
                  :loading="candidatesListUnderTransfer"
                >
                  Transfer Selected
                </v-btn>
              </v-row>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-data-table
                v-model="selectedCandidates"
                show-select
                :headers="headers"
                :items="candidatesBetweenTwoDates"
                :items-per-page="50"
                class="elevation-0"
                item-key="candidateId"
                :search="search"
                :footer-props="{
                  'items-per-page-options': [10, 25, 50, 100, 1000],
                }"
                @current-items="current = $event"
                @item-selected="bulkSelect"
                unselectable
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    dark
                    small
                    color="green"
                    depressed
                    @click="transferResumeOfOneCandidate(item)"
                    :disabled="
                      candidatesListUnderTransfer ||
                      candidateIdUnderTransfer != null
                    "
                    :loading="candidateIdUnderTransfer == item.candidateId"
                  >
                    Transfer
                  </v-btn>
                </template></v-data-table
              >
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  created() {
    const self = this;
    self.keyDownHandler = function ({ key }) {
      if (key == "Shift") self.shiftKeyOn = true;
    };
    self.keyUpHandler = function ({ key }) {
      if (key == "Shift") self.shiftKeyOn = false;
    };
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  },
  data() {
    return {
      shiftKeyOn: false,

      selectedCandidates: [],
      search: "",

      startDate: null,
      endDate: null,
      isGettingCandidates: false,
      currentTab: 0,
      candidatesListUnderTransfer: false,
      headers: [
        {
          text: "id",
          align: "start",
          sortable: true,
          value: "candidateId",
        },
        {
          text: "name",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "actions",
          align: "start",
          sortable: true,
          value: "actions",
        },
      ],
    };
  },
  components: {},
  methods: {
    bulkSelect({ item: b, value }) {
      const { selectedCandidates, current, shiftKeyOn } = this;

      if (selectedCandidates.length == 1 && value == true && shiftKeyOn) {
        const [a] = selectedCandidates;
        let start = current.findIndex((item) => item == a);
        let end = current.findIndex((item) => item == b);
        if (start - end > 0) {
          let temp = start;
          start = end;
          end = temp;
        }
        for (let i = start; i <= end; i++) {
          selectedCandidates.push(current[i]);
        }
      }
    },
    fetchCandidatesByDate() {
      this.isGettingCandidates = true;
      this.candidatesBetweenTwoDates = [];
      this.$store
        .dispatch("resumePageModule/getCandidatesBetweenTwoDates", {
          startDate: this.startDate,
          endDate: this.endDate,
        })
        .then(() => {
          this.isGettingCandidates = false;
          this.$swal({
            title: "Success",
            confirmButtonColor: "#3085d6",
            text: "Candidates fetched successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          this.isGettingCandidates = false;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            text: error.response.data.msg,
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        });
    },
    transferResumeOfOneCandidate(candidate) {
      this.candidateIdUnderTransfer = candidate.candidateId;
      this.$store
        .dispatch("resumePageModule/transferResumesOfCandidatesList", [
          candidate,
        ])
        .then(() => {
          this.candidateIdUnderTransfer = null;
          this.$swal({
            title: "Transfer Finished",
            confirmButtonColor: "#3085d6",
            text: "Resume Transfered successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.candidateIdUnderTransfer = null;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            text: error.response.data.msg,
            icon: "warning",
          });
        });
    },
    transferResumesOfCandidatesList(selectedOnly = false) {
      this.candidatesListUnderTransfer = true;
      this.$store
        .dispatch(
          "resumePageModule/transferResumesOfCandidatesList",
          selectedOnly
            ? this.selectedCandidates
            : this.candidatesBetweenTwoDates
        )
        .then(() => {
          this.candidatesListUnderTransfer = false;
          this.$swal({
            title: "Transfer Finished",
            confirmButtonColor: "#3085d6",
            text: "Resume Transfered successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.candidatesListUnderTransfer = false;
          this.$swal({
            title: "Oops, Something went wrong ! ",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            text: error.response.data.msg,
            icon: "warning",
          });
        });
    },
  },

  computed: {
    candidateIdUnderTransfer: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getCandidateIdUnderTransfer"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setCandidateIdUnderTransfer",
          newVal
        );
      },
    },
    isTransfeResumesByDateDialogVisible: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getIsTransfeResumesByDateDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setIsTransfeResumesByDateDialogVisible",
          newVal
        );
      },
    },
    candidatesBetweenTwoDates: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getCandidatesBetweenTwoDates"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setCandidatesBetweenTwoDates",
          newVal
        );
      },
    },
  },
};
</script>



<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

.grid-wrapper-sm {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
}
.grid-wrapper-md {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
}
.text-result {
  color: #ffbe0b;
  font-size: 1.3em;
}

.candidate-image {
  max-width: 8rem;
}
.cv-icon {
  max-width: 50px;
}

.candidates-text {
  color: #5f5f5f;
  font-size: 1.3em;
  font-weight: 600;
}

.candidates-number {
  font-family: "Lobster", cursive !important;
  color: #2c3e50;
  color: #112e36;
  font-size: 1.5em;
  /* font-style: italic; */
  font-weight: 600;
  margin: 0px 3px;
}
</style>