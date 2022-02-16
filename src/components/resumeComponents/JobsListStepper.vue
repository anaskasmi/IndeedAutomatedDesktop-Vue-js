<template>
  <div class="mx-5 mb-10">
    <TransferResumesByDate />
    <TransferDialogComponent />

    <div>
      <v-row class="row text-center my-10 text-right">
        <v-col>
          <v-btn
            color="#EEEEEE"
            elevation="0"
            tile
            @click="openTransferResumesByDateDialog"
          >
            <v-icon class="mr-2">mdi-calendar </v-icon>Transfer Resumes By
            Date</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="info" elevation="0" tile @click="fetchItems">
            <v-icon class="mr-2">mdi-refresh </v-icon>refresh page</v-btn
          >
        </v-col>
      </v-row>
      <v-alert
        outlined
        type="error"
        prominent
        border="left"
        v-if="fetchJobsStatus.failed"
      >
        Error : {{ fetchJobsStatus.failureMsg }}
        <p>
          <small class="text-info"
            >Tip : please Make sure that the Backend code is running
          </small>
        </p>
      </v-alert>
      <v-progress-linear
        class="my-10"
        v-if="fetchJobsStatus.isLoading"
        indeterminate
        color="info"
      ></v-progress-linear>
      <v-alert
        outlined
        type="info"
        prominent
        border="left"
        v-if="fetchJobsStatus.isLoading && !fetchJobsStatus.failed"
      >
        please wait a second we are fetching the jobs from the database...
      </v-alert>
    </div>

    <div v-if="!fetchJobsStatus.failed && !fetchJobsStatus.isLoading">
      <v-text-field
        placeholder="Search Jobs"
        prepend-inner-icon="mdi-magnify "
        filled
        rounded
        v-model="searchKeyWord"
        tile
        clearable
      ></v-text-field>
      <div class="row col-12 pb-0 mb-0 ml-1">
        <div class="col-2 pb-0 mb-0">
          <v-checkbox
            style="font-weight: 1000; color: #3d405b"
            label="Select ALL"
            color="#006d77"
            class=""
            v-model="isAllSelected"
          ></v-checkbox>
        </div>
      </div>

      <v-expansion-panels hover>
        <v-expansion-panel v-for="job in filteredList" :key="job.job_id">
          <v-expansion-panel-header @click="openTransferDialog(job)">
            <div class="row justify-content-around">
              <v-checkbox
                v-model="selectedJobs"
                :value="job"
                class="align-middle mr-4 my-auto"
                @click="selectJob($event)"
                color="#006d77"
              ></v-checkbox>

              <div class="my-auto col">
                <div
                  class="
                    my-3
                    text-info text-left text-uppercase
                    font-weight-bold
                    row
                    justify-content-start
                    align-middle
                  "
                >
                  {{ job.jobTitle }}
                </div>
                <div class="text-left mt-2">
                  <b class="text-uppercase">
                    <v-icon small class="text-blue-low mr-2">
                      mdi-clock-time-five-outline
                    </v-icon>
                    <span>created at :</span>
                  </b>
                  <span class="text-secondary" v-if="job.dateCreated">
                    {{ job.dateCreated.split("T")[0] }}
                  </span>
                  <span class="mx-3"> </span>

                  <b class="text-uppercase">
                    <v-icon small class="text-blue-low">
                      mdi-clock-time-five-outline
                    </v-icon>
                    end at :
                  </b>
                  <span class="text-secondary">
                    {{
                      job.budget_endDate ? job.budget_endDate.split("T")[0] : ""
                    }}
                  </span>
                </div>
                <div class="text-left mt-2">
                  <b class="text-uppercase">
                    <v-icon small class="text-blue-low mr-2">
                      mdi-map-marker </v-icon
                    >Locations :</b
                  >
                  <span
                    v-if="job.primaryJobLocation"
                    class="text-secondary mx-1"
                    >{{ job.primaryJobLocation }}
                  </span>

                  <span
                    v-else
                    class="text-secondary"
                    v-for="location in job.displayLocation"
                    v-bind:key="location.location"
                  >
                    {{ location.location }}
                    <span
                      class="mx-1"
                      style="color: black !important"
                      v-if="
                        job.displayLocation.length > 1 &&
                        job.displayLocation[job.displayLocation.length - 1] !=
                          location
                      "
                    >
                      |
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div
              v-if="job.status == 'ACTIVE'"
              style="color: #41aea9; font-size: 1.1em"
              class="text-right font-weight-bold text-upperxase"
            >
              {{ job.status }}
            </div>
            <div
              v-if="job.status == 'PAUSED'"
              class="text-warning text-right font-weight-bold text-upperxase"
            >
              {{ job.status }}
            </div>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<script>
import TransferDialogComponent from "./TransferDialog.vue";
import TransferResumesByDate from "./TransferResumesByDate/TransferResumesByDate.vue";
export default {
  name: "JobsList",
  components: {
    TransferDialogComponent,
    TransferResumesByDate,
  },
  created() {
    this.fetchItems();
  },
  data() {
    return {
      searchKeyWord: null,
    };
  },
  computed: {
    jobs: {
      get: function () {
        return this.$store.getters["resumePageModule/getJobs"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setJobs", newVal);
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
    isTransferDialogVisible: {
      get: function () {
        return this.$store.getters[
          "resumePageModule/getIsTransferDialogVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "resumePageModule/setIsTransferDialogVisible",
          newVal
        );
      },
    },
    currentJobOpened: {
      get: function () {
        return this.$store.getters["resumePageModule/getCurrentJobOpened"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setCurrentJobOpened", newVal);
      },
    },
    filteredList() {
      if (!this.searchKeyWord) {
        return this.jobs;
      } else {
        return this.jobs.filter((job) => {
          return job.jobTitle
            .toLowerCase()
            .includes(this.searchKeyWord.toLowerCase());
        });
      }
    },
    selectedJobs: {
      get: function () {
        return this.$store.getters["resumePageModule/getSelectedJobs"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setSelectedJobs", newVal);
      },
    },
    isAllSelected: {
      get: function () {
        return this.$store.getters["resumePageModule/getIsAllSelected"];
      },
      set: function (newVal) {
        if (!this.searchKeyWord) {
          this.$store.commit("resumePageModule/setIsAllSelected", newVal);
        } else {
          this.$store.commit(
            "resumePageModule/setIsAllSelectedForFilteredJobs",
            { newVal, filteredList: this.filteredList }
          );
        }
      },
    },
    fetchJobsStatus: {
      get: function () {
        return this.$store.getters["resumePageModule/getFetchJobsStatus"];
      },
    },
  },

  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    openTransferDialog(job) {
      console.log(job.job_id);
      this.currentJobOpened = job;
      this.isTransferDialogVisible = true;
    },
    openTransferResumesByDateDialog() {
      this.isTransfeResumesByDateDialogVisible = true;
    },
    async fetchItems() {
      await this.$store.dispatch("resumePageModule/fetchJobs");
    },
    selectJob(e) {
      e.cancelBubble = true;
    },
    async transferJobsResume(job_id) {
      await this.$store.dispatch("resumePageModule/transferJobsResume", job_id);
    },
  },
};
</script>


<style  scoped>
.text-panel1-high {
  color: #1d3557;
}
.text-panel1-low {
  color: #457b9d;
}
.text-panel2-high {
  color: #1d3557;
}
.text-panel2-low {
  color: #457b9d;
}
.text-panel3-high {
  color: #1d3557;
}
.text-panel3-low {
  color: #457b9d;
}

.bg-blue-1 {
  background-color: #f6f5f5;
  color: #003049 !important;
}
.bg-blue-2 {
  background-color: #f6f5f5;
  color: #003049 !important;
}
.bg-blue-3 {
  background-color: #f6f5f5;
  text-align: justify;
}
</style>
