<template>
  <div>
    <v-navigation-drawer color="#f6f9fb" v-model="drawer" app>
      <!-- home page -->
      <v-list-item>
        <v-img
          height="100"
          width="120"
          contain
          class="grow"
          style="cursor: pointer"
          :src="require('@/assets/img/logo.png')"
        >
        </v-img>
      </v-list-item>
      <v-divider></v-divider>
      <v-list >
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in links" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Job Description Builder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="pink lighten-1" tile elevation="1">
        <v-icon class="mr-2">mdi-pencil</v-icon> Job Builder</v-btn
      >
    </v-app-bar>

    <v-main> </v-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      selectedItem: null,
      links: [
        {
          icon: "mdi-account-hard-hat ",
          text: "positions",
        },
        {
          icon: "mdi-archive-check ",
          text: "Apply Methods",
        },
        {
          icon: "mdi-format-list-checks ",
          text: "Qualities",
        },
        {
          icon: "mdi-medical-bag ",
          text: "Compensation",
        },
        {
          icon: "mdi-file-compare  ",
          text: "Experience",
        },
        {
          icon: "mdi-puzzle-star ",
          text: "Incentive",
        },
        {
          icon: "mdi-tag-multiple ",
          text: "Tags",
        },
      ],
    };
  },
};
</script>
