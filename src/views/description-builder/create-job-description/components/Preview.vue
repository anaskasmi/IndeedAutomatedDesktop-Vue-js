<template >
  <v-row
    style="font-size: 18px; line-height: 2"
    align="center"
    class="col-12 mb-2"
  >
    <v-row justify="start" class="col-12 py-0" v-if="job.applyOnly"
      >Apply only: {{ job.applyOnly }}</v-row
    >

    <v-row justify="start" class="col-12 py-0" v-if="job.companyCulture"
      >Company culture: {{ job.companyCulture }}</v-row
    >
    <v-row justify="start" class="col-12 py-0" v-if="job.companyName">
      {{ job.companyName }}

      <span v-if="job.companyWebsite">({{ job.companyWebsite }})</span>

      <span v-if="job.city && job.state">
        {{ ` In ${job.city}, ${job.state} ` }}
      </span>

      <span v-if="job.jobType && job.roleDescription && job.positions">
        is seeking {{ job.jobType }} {{ job.roleDescription }}
        {{ arrayToList(job.positions) }}.</span
      >
    </v-row>
    <v-row
      justify="start"
      class="col-12 py-0"
      v-if="job.companyName && job.companyDescription"
    >
      {{ job.companyName }} Is {{ job.companyDescription }}
    </v-row>
    <v-row justify="start" class="col-12 py-0" v-if="job.candidateDescription">
      the ideal candidate {{ job.candidateDescription }}
    </v-row>
    <v-row
      justify="start"
      class="col-12 py-0"
      v-if="job.positions && job.positions.length"
    >
      Position(s):
      <v-row justify="start" class="col-12 ml-4">
        <ul>
          <li v-for="position in job.positions" :key="position">
            {{ position }}
          </li>
        </ul>
      </v-row>
    </v-row>
    <v-row
      justify="start"
      class="col-12 py-0"
      v-if="job.compensations && job.compensations.length"
    >
      compensation(s):
      <v-row justify="start" class="col-12 ml-4">
        <ul>
          <li v-for="compensation in job.compensations" :key="compensation">
            {{ compensation }}
          </li>
        </ul>
      </v-row>
    </v-row>
    <v-row
      justify="start"
      class="col-12 py-0"
      v-if="job.incentives && job.incentives.length"
    >
      Other incentive(s):
      <v-row justify="start" class="col-12 ml-4">
        <ul>
          <li v-for="incentive in job.incentives" :key="incentive">
            {{ incentive }}
          </li>
        </ul>
      </v-row>
    </v-row>
    <v-row
      justify="start"
      class="col-12 py-0"
      v-if="job.experiences && job.experiences.length"
    >
      Experiences:
      <v-row justify="start" class="col-12 ml-4">
        <ul>
          <li v-for="experience in job.experiences" :key="experience">
            {{ experience }}
          </li>
        </ul>
      </v-row>
    </v-row>
    <v-row
      justify="start"
      class="col-12 py-0"
      v-if="job.qualities && job.qualities.length"
    >
      Qualities:
      <v-row justify="start" class="col-12 ml-4">
        <ul>
          <li v-for="quality in job.qualities" :key="quality">
            {{ quality }}
          </li>
        </ul>
      </v-row>
    </v-row>
    <v-row
      justify="start"
      class="col-12 py-0"
      v-if="job.applyMethods && job.applyMethods.length"
    >
      How to apply :
      <v-row justify="start" class="col-12 ml-4">
        <ul>
          <li v-for="applyMethod in job.applyMethods" :key="applyMethod">
            {{ applyMethod }}
          </li>
        </ul>
      </v-row>
    </v-row>
    <v-row justify="start" class="col-12 py-0" v-if="job.signature">
      {{ job.signature }}
    </v-row>
  </v-row>
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
  methods: {
    arrayToList(array) {
      return array.join(", ").replace(/, ((?:.(?!, ))+)$/, " and $1");
    },
  },
};
</script>