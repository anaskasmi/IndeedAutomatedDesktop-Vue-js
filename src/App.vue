<template>
  <v-app>
    <v-main style="background-color: #f5f8fa">
      <router-view />
      <!-- snack bar  -->
      <v-snackbar v-model="snackbar.isVisible" :color="snackbar.color" clo>
        {{ snackbar.message }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.isVisible = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
  methods: {
    isRepostingPage() {
      return this.$route.name === "JobsReposter";
    },
    isUpdatingPage() {
      return this.$route.name === "JobsEditor";
    },
    isResumePage() {
      return this.$route.name === "ResumeTransfer";
    },
  },
  computed: {
    snackbar: {
      get: function () {
        return this.$store.getters["snackbar"];
      },
      set: function (newVal) {
        this.$store.commit("snackbar", newVal);
      },
    },
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bevan&display=swap");

.akaya {
  font-family: "Comfortaa", cursive !important;
}
.carter {
  font-family: "Bevan", cursive !important;
}
.font-poppins {
  font-family: "Inter", sans-serif !important;
}
.grow {
  transition: all 0.2s ease-in-out;
}
</style>