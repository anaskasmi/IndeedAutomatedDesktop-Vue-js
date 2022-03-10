<template>
  <v-container>
    <div class="text-center mt-12 primary--text grow text-h4 text-uppercase">
      <span class="carter"> Crelate Reports Generator </span>
    </div>
    <div class="text-center mt-2 grey--text text--darken-2">
      <span class="akaya"> Export Crelate reports by jobs number </span>
    </div>
    <v-row class="col-12 mb-6" justify="center">
      <v-col cols="3">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-card
      class="pa-6 report-card-shadow"
      height="400"
      rounded="lg"
      color="white"
    >
      <v-alert type="info" v-if="isLoading">
        We are working on your report, it will be ready in a minute...</v-alert
      >
      <v-alert type="success" v-if="successResult"
        >Great News ! we successfully generated your report, check your Desktop
        🎉</v-alert
      >
      <v-card-title>
        <v-row class="col-12 text-center font-poppins" style="color: #203239">
          Please put the job numbers, sparated by enter after each input !
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-combobox
          v-model="jobsNumbers"
          label="Job numbers"
          hint="Please put job numbers separated by a comma or hit enter after each number"
          multiple
          filled
          chips
          clearable
        ></v-combobox>
      </v-card-text>
      <v-card-actions>
        <v-row class="col-12" justify="center">
          <v-btn
            @click="generateReport"
            class="col-10"
            large
            elevation-4
            color="info"
            :disabled="!submitEnabled || isLoading"
            :loading="isLoading"
            >Generate</v-btn
          >
          <v-btn
            class="col-10 my-3"
            large
            elevation-4
            color="grey"
            @click="$router.back()"
            outlined
            >Back</v-btn
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CrelateReports",
  components: {},
  data() {
    return {
      currentStep: 1,
      isLoading: false,
      successResult: false,
    };
  },
  computed: {
    jobsNumbers: {
      get: function () {
        return this.$store.getters["crelateReportsGenerator/getJobsNumbers"];
      },
      set: function (newVal) {
        this.$store.commit("crelateReportsGenerator/setJobsNumbers", newVal);
      },
    },

    submitEnabled() {
      return this.jobsNumbers.length;
    },
  },
  methods: {
    async generateReport() {
      this.isLoading = true;
      this.successResult = false;
      try {
        await this.$store.dispatch("crelateReportsGenerator/generateReport");
        this.$swal({
          title: "Success",
          confirmButtonColor: "#3085d6",
          text: "Hi, We puted the report on your Desktop !",
          icon: "success",
        });
        this.successResult = true;
      } catch (error) {
        this.$swal({
          title: "Oops, Something went wrong ! ",
          text: error,
          icon: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-stepper {
  box-shadow: 0px 0px #fff;
}
.tag-input span.chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 3em;
}
.tag-input span.v-chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 3em;
  padding-left: 7px;
}
.report-card-shadow {
  box-shadow: rgba(47, 98, 192, 0.25) 0px 50px 100px -20px,
    rgba(0, 89, 172, 0.3) 0px 30px 60px -30px !important;
}
</style>