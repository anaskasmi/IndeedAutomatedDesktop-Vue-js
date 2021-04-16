<template>
  <div>
    <v-btn class="float-right px-8 mt-2" large color="success" elevation="2"  @click="startUpdatingSelectedJobs">Start updating</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    startUpdatingSelectedJobs() {
      this.$store.dispatch("updatePageModule/startUpdatingSelectedJobs");
    },
  },
};
</script>