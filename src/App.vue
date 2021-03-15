<template>
  <v-app>
    <v-app-bar app color="primary" dark class="">
      <v-toolbar-title>
        <div class="text-center">
          <span class="akaya">Indeed Automated</span>
        </div>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <Index />
    </v-main>
  </v-app>
</template>

<script>
import Index from "./views/index";
export default {
  name: "App",

  components: {
    Index,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');
.akaya {
font-family: 'Comfortaa', cursive;}
</style>


