<template>
  <v-app>
    <v-app-bar app color="primary" dark class="">
      <v-toolbar-title>
        <div class="text-center">
          <router-link to="/"
            ><span class="akaya text-white"
              >Indeed Automated
              <small class="text-warning" v-if="isRepostingPage()"
                >- Reposting version</small
              >
              <small class="text-warning" v-if="isUpdatingPage()"
                >- Updating version</small
              >
              <small class="text-warning" v-if="isResumePage()"
                >- Resumes Transfer</small
              >
            </span>
          </router-link>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/reposting">
        <v-btn
          color="#104375"
          class="mx-3"
          elevation="0"
          :disabled="isRepostingPage()"
        >
          Switch to Reposting version
        </v-btn>
      </router-link>
      <router-link to="/updating">
        <v-btn
          color="#28abb9"
          :disabled="isUpdatingPage()"
          class="mx-3"
          elevation="0"
        >
          Switch to Updating version
        </v-btn> </router-link
      ><router-link to="/resumeTransfer">
        <v-btn
          color="#FF6767"
          :disabled="isResumePage()"
          class="mx-3"
          elevation="0"
        >
          Switch to Resume version
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
  methods: {
    isRepostingPage() {
      return this.$route.name === "RepostingIndex";
    },
    isUpdatingPage() {
      return this.$route.name === "UpdatingIndex";
    },
    isResumePage()
    {
      return this.$route.name === "ResumeIndex";
    }
  },
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