<template>
  <div>
    <v-alert
      border="bottom"
      class="text-center akaya py-2"
      style="font-size: 24px"
      color="primary"
      elevation="2"
    >
      <div class="mb-3">
        {{ title }}
        </div>
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
  color: #ffffff;
}
</style>