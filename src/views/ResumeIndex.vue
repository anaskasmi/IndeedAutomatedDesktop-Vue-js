<template>
  <TransferResumesByDate />
</template>

<script>
import TransferResumesByDate from "@/components/resumeComponents/TransferResumesByDate.vue";
export default {
  name: "ResumesHomePage",
  components: {
    TransferResumesByDate,
  },
};
</script>

<style scoped>
.v-stepper {
  box-shadow: 0px 0px #fff;
}
</style>