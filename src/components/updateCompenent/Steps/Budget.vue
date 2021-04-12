<template>
  <div>
    <v-text-field
      :append-icon="
        budget ? 'mdi-checkbox-multiple-marked-outline ' : ''
      "
      label="Budget ($)"
      color="28527a"
      outlined
      clearable
      v-model="budget"
    >
    </v-text-field>
    <v-text-field
      :append-icon="
        maxCPC
          ? 'mdi-checkbox-multiple-marked-outline '
          : ''
      "
      label="Max Cost Per Click ($)"
      color="28527a"
      outlined
      v-model="maxCPC"
      clearable
    ></v-text-field>

    <v-menu
      ref="budget_endDate_menu"
      v-model="budget_endDate_menu"
      :close-on-content-click="false"
      :return-value.sync="budgetEndDate"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- budget end date -->
        <v-text-field
          outlined
          :append-icon="
            budgetEndDate
              ? 'mdi-checkbox-multiple-marked-outline '
              : 'mdi-calendar'
          "
          :color="budgetEndDate ? '28527a' : ''"
          v-model="budgetEndDate"
          label="Budget End date"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="budgetEndDate"
        no-title
        scrollable
        :min="getTomorrowDate()"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="budget_endDate_menu = false">
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.budget_endDate_menu.save(budgetEndDate)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>


<script>
export default {
  computed: {
    budget: {
      get: function () {
        return this.$store.getters["updatePageModule/getBudget"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setBudget", newVal);
      },
    },

    maxCPC: {
      get: function () {
        return this.$store.getters["updatePageModule/getMaxCPC"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setMaxCPC", newVal);
      },
    },

    budgetEndDate: {
      get: function () {
        return this.$store.getters["updatePageModule/getBudgetEndDate"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setBudgetEndDate", newVal);
      },
    },
  },
  data: () => {
    return {
      budget_endDate_menu: null,
    };
  },
  methods: {
    getTomorrowDate: function () {
      var result = new Date();
      result.setDate(result.getDate() + 1);
      let year = result.getFullYear();
      let month = (1 + result.getMonth()).toString().padStart(2, "0");
      let day = result.getDate().toString().padStart(2, "0");
      return year + "-" + month + "-" + day;
    },
  },
};
</script>