<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Position(s) :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          light
          multiple
          label="Positions"
          v-model="job.positions"
          :items="positionsSets"
          item-text="name"
          item-value="name"
          :loading="isLoading"
          :disabled="isLoading"
          chips
          :return-object="true"
          autocomplete="nope"
        ></v-combobox>
      </v-row>
      <v-row class="col-12">
        <v-row class="col-12" v-if="job.positions.length">
          <v-alert color="primary"  tile dense class="col-12" outlined border="left"> You picked </v-alert>
        </v-row>
        <div v-for="set in job.positions" :key="set">
          <v-chip
            color="info"
            outlined
            
            class="mx-2"
            v-for="item in set.positions"
            :key="item.name"
          >
            {{ item.name }}
          </v-chip>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import PositionsMixin from "@/views/description-builder/create-job-description/mixins/positionsMixin.js";

export default {
  mixins: [PositionsMixin],

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