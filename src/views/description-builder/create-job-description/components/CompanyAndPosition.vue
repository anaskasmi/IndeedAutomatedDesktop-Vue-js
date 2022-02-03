<template >
  <div>
    <v-row align="center" class="col-12">
      <v-col cols="6">
        <v-combobox
          hide-details
          clearable
          light
          autocomplete="nope"
          label="company name"
          :items="['company1', 'company2', 'company3', 'company4']"
          filled
          v-model="job.companyName"
        ></v-combobox>
      </v-col>
      <v-col cols="6">
        <v-text-field
          hide-details
          filled
          autocomplete="nope"
          clearable
          light
          label="company website"
          v-model="job.companyWebsite"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" class="col-12">
      <v-col cols="1"> In </v-col>
      <v-col>
        <v-combobox
          hide-details
          clearable
          light
          v-model="job.city"
          label="City"
          autocomplete="nope"
          :items="['Austin', 'Houston', 'Fargo']"
          filled
        ></v-combobox
      ></v-col>

      <v-col>
        <v-combobox
          hide-details
          clearable
          light
          v-model="job.state"
          label="State"
          autocomplete="nope"
          :items="['AL', 'FL', 'AK', 'OH', 'AZ', 'AR']"
          filled
        ></v-combobox>
      </v-col>
      ,
    </v-row>
    <v-row align="center" class="col-12">
      <v-col cols="2"> Is Seeking </v-col>
      <v-col>
        <v-combobox
          hide-details
          clearable
          v-model="job.jobType"
          light
          label="Job Type"
          autocomplete="nope"
          :items="['full-time', 'part-time']"
          filled
          chips
        ></v-combobox
      ></v-col>
      <v-col>
        <v-combobox
          hide-details
          clearable
          light
          v-model="job.roleDescription"
          label="Role Desc"
          autocomplete="nope"
          :items="['talented', 'great', 'experienced']"
          filled
          chips
        ></v-combobox>
      </v-col>
      <v-col>
        <v-combobox
          hide-details
          clearable
          light
          multiple
          label="Positions"
          :items="['position 1', 'position 2', 'position 3', 'position 4']"
          filled
          v-model="job.positions"
          autocomplete="nope"
          chips
        ></v-combobox>
      </v-col>
      .
    </v-row>
  </div>
</template>
<script>
export default {
  computed: {
    job: {
      get: function () {
        return this.$store.getters["DescriptionBuilderTemplateModule/job"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderTemplateModule/job", newVal);
      },
    },
  },
};
</script>