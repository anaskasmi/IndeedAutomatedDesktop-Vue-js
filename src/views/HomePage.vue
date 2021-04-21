<template>
  <div>
    <div>
      <div class="col d-flex justify-content-center mt-5">
        <router-link to="/reposting"
          ><v-btn x-large elevation="1" color="#28527a"  dark class="mt-10 mx-5">
            Start Reposting
          </v-btn></router-link
        >
        <router-link to="/updating"
          ><v-btn x-large elevation="1" color="#28abb9" dark class="mt-10 mx-5">
            Start Updating
          </v-btn></router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
  },
  data() {
    return {};
  },
  methods: {

  },
};
</script>

<style >
a {
  text-decoration: none !important;
}
a:link {
  text-decoration: none !important;
}
a:hover {
  text-decoration: none im !important;
}
</style>
