<template>
  <div>
    <v-container>
      <v-col class="">
        <v-row class="d-flex justify-center my-10">
          <img
            src="@/assets/img/description-builder.svg"
            class="w-25 mx-0"
            alt=""
          />
        </v-row>
        <v-row class="d-flex justify-center">
          <div class="resume-title text-center">
            Welcome To The Job Description Builder
          </div>
        </v-row>
      </v-col>
      <v-row>
        <v-btn
          large
          tile
          color="primary"
          depressed
          class="my-10 mx-auto"
          @click="
            $router.push(
              { name: 'descriptionBuilder.createJobdescription' },
              () => {}
            );
            collectInfoStepperIsVisible = true;
          "
        >
          Create a Job Description
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
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
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
.resume-title {
  font-family: "Lobster", cursive !important;
  color: #2c3e50;
  font-size: 40px;
}
</style>
