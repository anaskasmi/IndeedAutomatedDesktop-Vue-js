<template >
  <div>
    <v-row align="center" class="col-12">
      <v-col cols="6">
        <v-text-field
          hide-details
          clearable
          solo-inverted
          light
          autocomplete="nope"
          label="company name"
          v-model="job.company.name"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          hide-details
          autocomplete="nope"
          clearable
          solo-inverted
          light
          label="company website"
          v-model="job.company.website"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" class="col-12">
      <v-col cols="1"> In </v-col>
      <v-col>
        <v-text-field
          hide-details
          clearable
          solo-inverted
          light
          v-model="job.company.city"
          label="City"
          autocomplete="nope"
        ></v-text-field
      ></v-col>

      <v-col>
        <v-text-field
          hide-details
          clearable
          solo-inverted
          light
          v-model="job.company.state"
          label="State"
          autocomplete="nope"
        ></v-text-field>
      </v-col>
      ,
    </v-row>
    <v-row align="center" class="col-12">
      <v-col cols="2"> Is Seeking </v-col>
      <v-col>
        <v-combobox
          hide-details
          clearable
          solo-inverted
          v-model="job.jobType"
          light
          label="Job Type"
          autocomplete="nope"
          :items="['full-time', 'part-time']"
          chips
          multiple
        ></v-combobox
      ></v-col>
      <v-col>
        <v-combobox
          hide-details
          clearable
          solo-inverted
          light
          v-model="job.roleDescription"
          label="Role Desc"
          autocomplete="nope"
          :items="roleDescriptions"
          item-text="name"
          item-value="name"
          :return-object="false"
          :loading="isLoading"
          :disabled="isLoading"
          chips
        ></v-combobox>
      </v-col>
      <v-col>
        <v-combobox
          hide-details
          clearable
          solo-inverted
          light
          multiple
          label="Positions"
          v-model="job.positions"
          :items="positions"
          item-text="name"
          item-value="name"
          :loading="isLoading"
          :disabled="isLoading"
          chips
          :return-object="false"
          autocomplete="nope"
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
    roleDescriptions: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptions"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptions",
          newVal
        );
      },
    },
    positions: {
      get: function () {
        return this.$store.getters["DescriptionBuilderPositionsModule/items"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderPositionsModule/items", newVal);
      },
    },
  },
};
</script>