<template>
  <v-container>
    <div class="text-center mt-12 primary--text grow text-h4 text-uppercase">
      <span class="carter"> Invoices Generator </span>
    </div>
    <div class="text-center mt-2 grey--text text--darken-2">
      <span class="akaya"> Export Indeed invoices by jobs number </span>
    </div>
    <v-row class="col-12 mb-6" justify="center">
      <v-col cols="3">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-card rounded="lg" elevation="0">
      <DatePicker />
      <v-divider class="my-3 mx-12"></v-divider>
      <NumbersInput />
      <v-row class="col-12" justify="center">
        <v-btn
          color="success"
          class="my-12 px-12"
          tile
          x-large
          elevation="3"
          @click="generateInvoice"
          :loading="isLoading"
          :disabled="isLoading || !submitEnabled"
        >
          <v-icon class="mr-2">mdi-file-download</v-icon>
          Generate Invoice
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import DatePicker from "@/views/indeed-invoices/components/DateSelector.vue";
import NumbersInput from "@/views/indeed-invoices/components/NumbersInput.vue";
export default {
  name: "UpdatingHomePage",
  components: {
    DatePicker,
    NumbersInput,
  },
  data() {
    return {
      currentStep: 1,
      isLoading: false,
    };
  },
  computed: {
    jobsNumbers: {
      get: function () {
        return this.$store.getters["invoiceGeneratorModule/getJobsNumbers"];
      },
      set: function (newVal) {
        this.$store.commit("invoiceGeneratorModule/setJobsNumbers", newVal);
      },
    },
    selectedDates: {
      get: function () {
        return this.$store.getters["invoiceGeneratorModule/getSelectedDates"];
      },
      set: function (newVal) {
        this.$store.commit("invoiceGeneratorModule/setsSelectedDates", newVal);
      },
    },

    submitEnabled() {
      return this.jobsNumbers.length && this.selectedDates.length == 2;
    },
  },
  methods: {
    async generateInvoice() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("invoiceGeneratorModule/generateInvoice");
        this.$swal({
          title: "Success",
          confirmButtonColor: "#3085d6",
          text: "Hi, We puted the invoice on your Desktop !",
          icon: "success",
        });
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
</style>