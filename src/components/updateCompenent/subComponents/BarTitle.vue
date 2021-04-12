<template>
  <div >
    <v-alert
      class="text-center akaya py-2"
      style="font-size: 20px"
      color="#dddddd"
      elevation="0"
      tile
    >
      {{ title }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped>
.akaya {
  font-family: "Lato", sans-serif;
  color: #525252 ;
}
</style>