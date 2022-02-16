<template>
  <div>
    <v-container>
      <v-alert outlined type="info" prominent border="left">
        Please Click open the browser, then keep the browser opened during this
        whole process
      </v-alert>
      <v-btn
        large
        tile
        block
        color="success"
        class="my-10"
        @click="startTheBrowser()"
      >
        Start the chromuim browser
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "StartBrowserStepper_update",
  data() {
    return {};
  },
  methods: {
    BASE_URL() {
      return this.$store.state.BASE_URL;
    },
    startTheBrowser() {
      let url = this.BASE_URL() + "/jobs/getNewBrowserForUpdate";
      this.$axios
        .get(url)
        .then(() => {
          //todo move to next step
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

