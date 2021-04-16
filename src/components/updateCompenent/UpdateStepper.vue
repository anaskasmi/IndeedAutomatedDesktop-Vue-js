<template>
  <v-container>
    <br />
    <ProgressDialog />
    <BarTitle title="General Info" class="mt-10" />
    <GeneralInfo />
    <!-- <hr class="my-10" /> -->
    <BarTitle title="Description" class="mt-10 pt-10" />
    <Description />
    <!-- <hr class="my-10" /> -->
    <BarTitle title="Budget" class="mt-10 pt-10" />
    <Budget />
    <StartUpdatingButton />
  </v-container>
</template>


<script>
import BarTitle from "./subComponents/BarTitle";
import GeneralInfo from "./Steps/GeneralInfo";
import Description from "./Steps/Description";
import Budget from "./Steps/Budget";
import StartUpdatingButton from "./Steps/StartUpdatingButton";
import ProgressDialog from "./Steps/ProgressDialog";
export default {
  components: {
    BarTitle,
    GeneralInfo,
    Description,
    Budget,
    StartUpdatingButton,
    ProgressDialog,
  },
  data: () => {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap");
hr {
  border-color: rgb(179 179 179);
  border-width: 3px;
}
</style>