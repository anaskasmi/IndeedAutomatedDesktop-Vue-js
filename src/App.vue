<template>
  <v-app>
    <v-app-bar app color="primary" dark class="">
      <v-toolbar-title>
        <div class="text-center">
          <router-link to="/"
            ><span class="akaya text-white">Indeed Automated</span>
          </router-link>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/reposting">
        <v-btn color="#104375" class="mx-3" elevation="0">
          Reposting Page
        </v-btn>
      </router-link>
      <router-link to="/updating">
        <v-btn color="#28abb9" class="mx-3" elevation="0">
          Updating Page
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
<style >
a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap");
.akaya {
  font-family: "Comfortaa", cursive;
}
</style>