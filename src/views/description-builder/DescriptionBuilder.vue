<template>
  <div>
    <CollectInfoStepper />
    <v-navigation-drawer color="#f6f9fb" v-model="drawer" app width="300">
      <!-- home page -->
      <v-list-item>
        <v-img
          height="100"
          width="120"
          contain
          class="grow"
          style="cursor: pointer"
          :src="require('@/assets/img/logo.png')"
          @click="$router.push({ name: 'HomePage' })"
        >
        </v-img>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-btn
            color="#2c3e50"
            class="mb-4 mx-4"
            dark
            depressed
            width="250"
            @click="
              $router.push(
                { name: 'descriptionBuilder.createJobdescription' },
                () => {}
              );
              collectInfoStepperIsVisible = true;
            "
          >
            <v-icon class="mr-4">mdi-shape-square-rounded-plus</v-icon>New Job
          </v-btn>
          <v-list-item
            @click="$router.push(item.route)"
            v-for="(item, i) in links"
            :key="i"
          >
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
      <v-toolbar-title
        style="cursor: pointer"
        class="Lobster ml-3 my-auto"
        @click="$router.push({ name: 'descriptionBuilder.home' })"
      >
        Description Builder</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        light
        color="white darken-1"
        style="color: #2c3e50"
        class="font-weight-bold"
        depressed
        rounded
        large
        @click="
          $router.push(
            { name: 'descriptionBuilder.createJobdescription' },
            () => {}
          );
          collectInfoStepperIsVisible = true;
        "
      >
        <v-icon color="#2E4C6D" class="mr-2"
          >mdi-shape-square-rounded-plus</v-icon
        >
        New Job
      </v-btn>
    </v-app-bar>

    <v-container>
      <router-view></router-view>
    </v-container>
  </div>
</template>
<script>
import CollectInfoStepper from "@/views/description-builder/create-job-description/components/collect-info-stepper/CollectInfoStepper.vue";
export default {
  components: { CollectInfoStepper },
  computed: {
    collectInfoStepperIsVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible",
          newVal
        );
      },
    },
  },
  data() {
    return {
      drawer: true,
      selectedItem: null,
      links: [
        {
          icon: "mdi-office-building",
          text: "companies",
          route: { name: "descriptionBuilder.companies" },
        },
        {
          icon: "mdi-account-hard-hat",
          text: "positions",
          route: { name: "descriptionBuilder.positions" },
        },
        {
          icon: "mdi-archive-check ",
          text: "Apply Methods",
          route: { name: "descriptionBuilder.applyMethods" },
        },
        {
          icon: "mdi-format-list-checks ",
          text: "Qualities",
          route: { name: "descriptionBuilder.qualities" },
        },
        {
          icon: "mdi-medical-bag ",
          text: "Compensation",
          route: { name: "descriptionBuilder.compensation" },
        },
        {
          icon: "mdi-file-compare  ",
          text: "Experience",
          route: { name: "descriptionBuilder.experiences" },
        },
        {
          icon: "mdi-puzzle-star ",
          text: "Incentive",
          route: { name: "descriptionBuilder.incentives" },
        },
        {
          icon: "mdi-tag-multiple ",
          text: "Tags",
          route: { name: "descriptionBuilder.tags" },
        },
        {
          icon: "mdi-star-face",
          text: "roles descriptions",
          route: { name: "descriptionBuilder.roleDescriptions" },
        },
      ],
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
.Lobster {
  font-family: "Lobster", cursive;
}
</style>