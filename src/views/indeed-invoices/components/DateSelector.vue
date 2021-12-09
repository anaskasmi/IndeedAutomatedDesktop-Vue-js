<template>
  <v-card elevation="0">
    <v-card-title>
      <v-row
        justify="center"
        class="col-12 info--text text--darken-1 font-weight-bold"
      >
        {{ selectedDates.toString().replaceAll(",", "   >   ") }}
      </v-row>
    </v-card-title>
    <v-row justify="center">
      <v-date-picker
        class="col-8"
        full-width
        v-model="selectedDates"
        range
      ></v-date-picker>
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
      dateRangeText: null,
    };
  },
  computed: {
    selectedDates: {
      get: function () {
        return this.$store.getters["invoiceGeneratorModule/getSelectedDates"];
      },
      set: function (newVal) {
        this.$store.commit("invoiceGeneratorModule/setsSelectedDates", newVal);
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
