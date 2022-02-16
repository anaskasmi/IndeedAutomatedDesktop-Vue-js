<template>
  <v-btn large dark rounded color="#457b9d" class="mr-2 text-white col-2">
    <v-icon class="mr-2"> {{ icon }} </v-icon>
    {{ title }} :
    <b class="ml-2"> {{ number }}</b>
  </v-btn>
</template>
<script>
export default {
  props: ["icon", "title", "number"],
};
</script>
<style scoped>
</style>
