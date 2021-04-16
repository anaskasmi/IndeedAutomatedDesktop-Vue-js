<template>
  <div>
    <v-text-field
      :append-icon="budget ? 'mdi-checkbox-multiple-marked-outline ' : ''"
      label="Budget ($)"
      color="28527a"
      outlined
      clearable
      v-model="budget"
      :rules="[budgetRule]"
    >
    </v-text-field>

    <v-text-field
      :append-icon="maxCPC ? 'mdi-checkbox-multiple-marked-outline ' : ''"
      label="Max cost per click ($)"
      min="0.15"
      @keypress="isNumberWithdots($event)"
      type="number"
      color="28527a"
      outlined
      v-model="maxCPC"
      clearable
      :rules="[maxCPCRule]"
    ></v-text-field>
    <span class="mb-2" style="color: #6c757d">
      <v-icon color="warning">mdi-comment-alert-outline</v-icon>
      Make sure the date is greater than todays date by at least 1 day
    </span>
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
          clearable
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
    budgetRule: (v) => {
      if (v) {
        if (v > 25) return true;
        return "budget must be at least 25";
      } else {
        return true;
      }
    },
    maxCPCRule: (v) => {
      if (v) {
        if (v > 0.15) return true;
        return "Max CPC must be at least 0.15";
      } else {
        return true;
      }
    },
  },
};
</script>