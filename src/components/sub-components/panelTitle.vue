<template>
  <v-app-bar dark color="#214252" class="shadow-sm">
    <v-toolbar-title> {{ title }}</v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style scoped>
</style>
