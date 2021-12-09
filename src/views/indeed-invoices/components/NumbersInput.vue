<template>
  <v-card elevation="0">
    <v-row class="col-12" justify="center">
      <div class="col-8">
        <v-combobox
          hide-details
          multiple
          label="Jobs numbers"
          chips
          deletable-chips
          filled
          clearable
          v-model="jobsNumbers"
        >
        </v-combobox>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      currentStep: 1,
      dates: [],
      dateRangeText: null,
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
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
  },
};
</script>
