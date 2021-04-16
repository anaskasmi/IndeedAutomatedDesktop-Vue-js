<template>
  <div>
    <v-text-field
      label="Job Title"
      color="#17a2b8"
      outlined
      clearable
      v-model="jobTitle"
      :rules="[jobTitleRules]"
    ></v-text-field>
    <v-text-field
      label="City"
      color="#17a2b8"
      outlined
      clearable
      v-model="locationCity"
    ></v-text-field>

    <v-autocomplete
      clearable
      outlined
      :items="states"
      dense
      v-model="locationState"
      label="state"
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      states: [
        "AK",
        "AL",
        "AR",
        "AS",
        "AZ",
        "CA",
        "CO",
        "CT",
        "DC",
        "DE",
        "FL",
        "GA",
        "GU",
        "HI",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MA",
        "MD",
        "ME",
        "MI",
        "MN",
        "MO",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NH",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VA",
        "VI",
        "VT",
        "WA",
        "WI",
        "WV",
        "WY",
      ],
    };
  },
  computed: {
    jobTitle: {
      get: function () {
        return this.$store.getters["updatePageModule/getJobTitle"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setJobTitle", newVal);
      },
    },
    locationCity: {
      get: function () {
        return this.$store.getters["updatePageModule/getLocationCity"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setLocationCity", newVal);
      },
    },
    locationState: {
      get: function () {
        return this.$store.getters["updatePageModule/getLocationState"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setLocationState", newVal);
      },
    },
  },
  methods: {
    jobTitleRules(v) {
      if (v) {
        if (v.length < 75) return true;
        else return "Job title can't have more than 75 character";
      }
      else{
        return true;
      }
    },
  },
};
</script>