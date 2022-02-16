<template>
  <v-row
    :class="{
      'grid-wrapper-sm': $vuetify.breakpoint.mdAndDown,
      'grid-wrapper-md': $vuetify.breakpoint.mdAndUp,
    }"
  >
    <div v-for="index in currentJobOpened.applicationCount.total" :key="index">
      <v-card class="text-center pa-4">
        <v-card-text class="text-center">
          <img
            class="candidate-image"
            src="@/assets/img/undraw_profile_pic_ic5t.svg"
            alt=""
          />
        </v-card-text>
        <v-card-title class="justify-center">Unknown</v-card-title>
      </v-card>
    </div>
  </v-row>
</template>


<script>
export default {
  computed: {
    currentJobOpened: {
      get: function () {
        return this.$store.getters["resumePageModule/getCurrentJobOpened"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setCurrentJobOpened", newVal);
      },
    },
  },
  methods: {},
};
</script>
