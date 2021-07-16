<template>
  <div class="mx-5 mb-10">
<<<<<<< HEAD
    <div class="text -center">{{ queueLenght }} Jobs Selected</div>
=======
    <div class="text -center">{{ queueLenght}} Jobs Selected</div>
>>>>>>> 02f6b0cd8ad8d5df37424606805a1ce3cde44ea4
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
        <v-expansion-panel v-for="(job, i) in jobs" :key="i">
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
                <panelTitle title="Applicants" />
                <br />
                <!-- row of buttons -->
                <div class="mx-5 px-5 my-4">
                  <div class="row col-12 justify-content-between">
                    <!-- total -->
                    <applicantButton
                      icon="mdi-account-multiple-check"
                      title="Total"
                      :number="job.applicationCount.total"
                    />

                    <!-- new -->
                    <applicantButton
                      icon="mdi-account-star"
                      title="New"
                      :number="job.applicationCount.new"
                    />
                    <!-- reviewed -->
                    <applicantButton
                      icon="mdi-comment-account"
                      title="Reviewed"
                      :number="job.applicationCount.reviewed"
                    />
                    <!-- phoneScreened -->
                    <applicantButton
                      icon="mdi-badge-account-outline"
                      title="Phone Screened"
                      :number="job.applicationCount.phoneScreened"
                    />
                    <!-- interviewed -->
                    <applicantButton
                      icon="mdi-account-check"
                      title="Interviewed"
                      :number="job.applicationCount.interviewed"
                    />
                  </div>

                  <div class="row col-12 justify-content-between">
                    <!-- offerMade -->
                    <applicantButton
                      icon="mdi-account-details"
                      title="Offer Made"
                      :number="job.applicationCount.offerMade"
                    />

                    <!-- rejected -->
                    <applicantButton
                      icon="mdi-account-off"
                      title="Rejected"
                      :number="job.applicationCount.rejected"
                    />

                    <!-- hired -->
                    <applicantButton
                      icon="mdi-account-multiple-plus"
                      title="Hired"
                      :number="job.applicationCount.hired"
                    />

                    <!-- pending -->
                    <applicantButton
                      icon="mdi-account-clock"
                      title="Pending"
                      :number="job.applicationCount.pending"
                    />
                    <!-- sponsored -->
                    <applicantButton
                      icon="mdi-account-convert"
                      title="Sponsored"
                      :number="job.applicationCount.sponsored"
                    />
                  </div>
                </div>
              </v-card-text>

              <v-card-text class="my-4">
                <panelTitle title="Budget" />
                <div class="mt-5">
                  <div class="row col-12 justify-content-around">
                    <budgetPanel
                      title="Amount"
                      :value="'$' + job.budget_amount / 100"
                    />
                    <budgetPanel
                      title="Display cost"
                      :value="job.budget_displayCost"
                    />
                    <budgetPanel
                      title="Max CPC"
                      v-if="job.budget_maxCPC"
                      :value="'$' + job.budget_maxCPC"
                    />
                    <budgetPanel title="Budget plan" :value="job.budget_plan" />
                    <budgetPanel
                      v-if="job.budget_endDate"
                      title="budget End Date"
                      :value="
                        job.budget_endDate.replace(`T`, ` `).replace(`Z`, ``)
                      "
                    />
                  </div>
                </div>
              </v-card-text>

              <v-card-text class="my-4">
                <panelTitle title="Description" />
                <div
                  class="text-muted pa-5 mt-5 shadow-sm border border-dark"
                  style="
                    font-size: 1.4em;
                    background-color: #faf8f8;
                    text-align: justify;
                  "
                  v-if="job.jobDescription && !job.jobDescriptionHtml"
                >
                  {{ job.jobDescription.split("*").join().replaceAll(",", "") }}
                </div>
                <div
                  class="text-muted pa-5 mt-5 shadow-sm border border-dark"
                  style="
                    font-size: 1.4em;
                    background-color: #faf8f8;
                    text-align: justify;
                  "
                  v-if="job.jobDescriptionHtml"
                  v-html="job.jobDescriptionHtml"
                ></div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<script>
import applicantButton from "../JobsListStepSubCompenent/applicantButton.vue";
import budgetPanel from "../JobsListStepSubCompenent/budgetPanel.vue";
import panelTitle from "../JobsListStepSubCompenent/panelTitle.vue";

export default {
  name: "JobsList",

  components: {
    applicantButton,
    budgetPanel,
    panelTitle,
  },
  created() {
    this.fetchItems();
  },
  computed: {
    jobs: {
      get: function () {
        return this.$store.getters["repostPageModule/getJobs"];
      },
      set: function (newVal) {
        this.$store.commit("repostPageModule/setJobs", newVal);
      },
    },
    queueLenght: {
      get() {
        return this.$store.getters["repostPageModule/getQueueLength"];
      },
    },
    selectedJobs: {
      get: function () {
        return this.$store.getters["repostPageModule/getSelectedJobs"];
      },
      set: function (newVal) {
        this.$store.commit("repostPageModule/setSelectedJobs", newVal);
      },
    },
    isAllSelected: {
      get: function () {
        return this.$store.getters["repostPageModule/getIsAllSelected"];
      },
      set: function (newVal) {
        this.$store.commit("repostPageModule/setIsAllSelected", newVal);
      },
    },
    fetchJobsStatus: {
      get: function () {
        return this.$store.getters["repostPageModule/getFetchJobsStatus"];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },

    async fetchItems() {
      await this.$store.dispatch("repostPageModule/fetchJobs");
    },
    selectJob(e) {
      e.cancelBubble = true;
    },
  },
};
</script>


<style  scoped>
.text-result {
  color: #ffbe0b;
  font-size: 1.3em;
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
