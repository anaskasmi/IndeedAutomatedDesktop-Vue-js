<template>
  <div>
    <v-text-field
      label="Job Title"
      color="#17a2b8"
      outlined
      clearable
      v-model="jobTitle"
    ></v-text-field>
    <v-text-field
      label="Location"
      color="#17a2b8"
      outlined
      clearable
      v-model="location"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  computed: {
    jobTitle: {
      get: function () {
        return this.$store.getters["updatePageModule/getJobTitle"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setJobTitle", newVal);
      },
    },
    location: {
      get: function () {
        return this.$store.getters["updatePageModule/getLocation"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setLocation", newVal);
      },
    },
  },
};
</script>