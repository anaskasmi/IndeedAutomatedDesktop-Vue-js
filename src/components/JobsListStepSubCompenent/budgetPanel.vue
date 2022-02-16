<template>
  <v-alert
    dark
    outlined
    border="top"
    color="rgb(69 123 157)"
    class="text-center text-uppercase p-4 shadow-sm"
  >
    <div style="font-size: 1.4em" class="font-weight-bold mb-3">
      {{ title }}
    </div>
    <div style="font-size: 1.8em; color: #273e47">
      {{ value }}
    </div>
  </v-alert>
</template>
<script>
export default {
  props: ["title", "value"],
};
</script>
<style scoped>
</style>
