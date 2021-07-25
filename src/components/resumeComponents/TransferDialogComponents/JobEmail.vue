<template>
  <v-row class="justify-center">
    <v-alert
      color="cyan"
      border="left"
      elevation="1"
      class="mb-8"
      colored-border
      icon="mdi-email"
    >
      Email :
      <span
        class="font-weight-bold grey--text text--darken-2"
        v-if="isThisJobHasEmail"
      >
        {{ currentJobOpened.jobDetails_emails[0] }}
      </span>
      <span class="font-weight-bold gret--text" v-else-if="isGettingJobEmail">
        Lodaing ...
      </span>
      <span class="font-weight-bold" v-else> Unknown Email</span>
    </v-alert>
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
    isThisJobHasEmail() {
      return (
        this.currentJobOpened.jobDetails_emails &&
        this.currentJobOpened.jobDetails_emails.length > 0
      );
    },
    isGettingJobEmail: {
      get: function () {
        return this.$store.getters["resumePageModule/getIsGettingJobEmail"];
      },
      set: function (newVal) {
        this.$store.commit("resumePageModule/setIsGettingJobEmail", newVal);
      },
    },
  },
  methods: {},
};
</script>
