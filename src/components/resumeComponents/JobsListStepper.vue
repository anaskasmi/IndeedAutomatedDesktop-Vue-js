<template>
  <div class="mx-5 mb-10">
    <div>
      <div class="my-10 text-right">
        <v-btn color="info" elevation="0" tile @click="fetchItems">
          <v-icon class="mr-2">mdi-refresh </v-icon>refresh page</v-btn
        >
      </div>
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

      <v-expansion-panels inset hover multiple>
        <v-expansion-panel v-for="job in filteredList" :key="job.job_id">
          <v-expansion-panel-header>
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
          <v-expansion-panel-content>
            <v-card class="mt-2 p-0 shadow-none">
              <v-card-text class="my-4" v-if="job.applicationCount">
                <!-- row of buttons -->
                <v-col class="my-4">
                  <!-- total -->
                  <v-row class="ml-6 align-center justify-center">
                    <img class="cv-icon" src="/cv.svg" />
                    <div class="mx-10 candidates-text">
                      This job has
                      <span class="candidates-number">{{
                        job.applicationCount.total
                      }}</span>
                      Candidates
                    </div>
                  </v-row>
                  <v-row class="align-center justify-center my-10">
                    <v-btn
                      color="success"
                      class="py-6"
                      elevation="0"
                      @click="transferJobsResume(job.job_id)"
                    >
                      <v-icon class="mr-2">mdi-share-all</v-icon>
                      Download & Transefer Resumes
                    </v-btn>
                  </v-row>
                </v-col>
              </v-card-text>

              <v-card-text class="my-4" v-if="!job.applicationCount">
                <!-- row of buttons -->
                <div class="mx-5 px-5 my-4">
                  <div class="row col-12 d-flex justify-center">
                    <!-- total -->
                    <v-row class="align-center justify-center">
                      <img class="cv-icon" src="/cv.svg" />
                      <div class="mx-10 candidates-text">
                        This job has
                        <span class="candidates-number">0</span> Candidates
                      </div>
                    </v-row>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<script>
export default {
  name: "JobsList",
  components: {},
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
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

.text-result {
  color: #ffbe0b;
  font-size: 1.3em;
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
