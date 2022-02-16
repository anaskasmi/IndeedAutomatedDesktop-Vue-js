<template>
  <div>
    <v-container>
      <v-col class="">
        <v-row class="d-flex justify-center my-10">
          <img src="@/assets/img/undraw_Hiring_re_yk5n.svg" class="w-25 mx-0" alt="" />
        </v-row>
        <v-row class="d-flex justify-center">
          <div class="resume-title text-center">Welcome To Your Resume Transfer Helper</div>
        </v-row>
      </v-col>
  <hr class="my-10">
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.resume-title {
font-family: 'Lobster', cursive !important;  color: #2c3e50;
font-size: 40px;
}
</style>

