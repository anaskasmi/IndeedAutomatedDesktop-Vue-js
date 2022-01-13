<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list rounded >
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
          icon: "mdi-domain",
          text: "positions",
        },
        {
          icon: "mdi-pencil",
          text: "Apply Methods",
        },
        {
          icon: "mdi-pencil",
          text: "Qualities",
        },
        {
          icon: "mdi-pencil",
          text: "Compensation",
        },
        {
          icon: "mdi-pencil",
          text: "Experience",
        },
        {
          icon: "mdi-pencil",
          text: "Incentive",
        },
        {
          icon: "mdi-pencil",
          text: "Tags",
        },
      ],
    };
  },
};
</script>
