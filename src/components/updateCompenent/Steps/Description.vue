<template>
  <div>
    <ckeditor v-model="description" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
export default {
  computed: {
    description: {
      get: function () {
        return this.$store.getters["updatePageModule/getDescription"];
      },
      set: function (newVal) {
        this.$store.commit("updatePageModule/setDescription", newVal);
      },
    },
  },
  data: () => {
    return {
      editorConfig: {
        toolbar: [["Bold"], ["Italic"], ["BulletedList"]],
      },
    };
  },
};
</script>