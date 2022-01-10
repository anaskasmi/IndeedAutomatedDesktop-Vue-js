<template>
  <v-app>
    <v-main style="background-color: #f5f8fa">
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
      return this.$route.name === "JobsReposter";
    },
    isUpdatingPage() {
      return this.$route.name === "JobsEditor";
    },
    isResumePage() {
      return this.$route.name === "ResumeTransfer";
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
@import url('https://fonts.googleapis.com/css2?family=Bevan&display=swap');

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