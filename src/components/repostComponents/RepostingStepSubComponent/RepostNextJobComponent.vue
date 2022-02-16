<template>
  <div class="text-center">
    <v-btn
      color="#0f3057"
      dark
      tile
      @click="execute()"
      elevation="3"
      x-large
      class="mb-10 font-weight-bold float-right mr-6"
    >
      Repost Next Job
      <v-icon>mdi-chevron-right </v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["stepNumber"],

  methods: {
    execute() {
      this.$store.commit("repostPageModule/startRepostingTheNextJob");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },
};
</script>