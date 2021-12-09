<template>
  <v-card>
    <v-stepper v-model="currentStep" non-linear elevation="0">
      <v-stepper-header>
        <v-stepper-step editable :complete="false" step="1">
          Start Browser
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable :complete="false" step="2">
          Generate Invoice
        </v-stepper-step>
      </v-stepper-header>

      <!-- steps cards -->
      <v-stepper-items elevation="0">
        <v-stepper-content step="1" elevation="0">
          <v-card elevation="0">
            <StartBrowserStepper />
          </v-card>
          <hr />

          <v-btn
            color="primary"
            tile
            large
            class="float-right"
            @click="currentStep = 2"
          >
            <v-icon>mdi-chevron-right </v-icon>

            Set the dates and job number
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2" class="text-center">
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
              :disabled="isLoading"
            >
              <v-icon class="mr-2">mdi-file-download</v-icon>
              Generate Invoice
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import StartBrowserStepper from "@/views/indeed-invoices/components/StartBrowserStep.vue";
import DatePicker from "@/views/indeed-invoices/components/DateSelector.vue";
import NumbersInput from "@/views/indeed-invoices/components/NumbersInput.vue";
export default {
  name: "UpdatingHomePage",
  components: {
    StartBrowserStepper,
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
    oneJobOrMoreSelected: {
      get() {
        return this.$store.getters[
          "updatePageModule/getIsRepostingPageEnabled"
        ];
      },
    },
    jobs: {
      get: function () {
        return this.$store.getters["updatePageModule/getJobs"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setJobs", newVal);
      },
    },
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    async generateInvoice() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("invoiceGeneratorModule/generateInvoice");
        this.$swal({
          title: "Success",
          confirmButtonColor: "#3085d6",
          text: "Generated successfully",
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