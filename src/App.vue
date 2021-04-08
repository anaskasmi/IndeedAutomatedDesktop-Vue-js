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
      <RepostingHomePage />
    </v-main>
  </v-app>
</template>

<script>
import RepostingHomePage from "./views/RepostingHomePage";
export default {
  name: "App",

  components: {
    RepostingHomePage,
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


