<template>
  <div class="my-4">
    <v-text-field
      outlined
      v-if="edit"
      dense
      v-model="item.name"
      @blur.native="
        updateItem();
        edit = false;
      "
      @keyup.enter.native="
        updateItem();
        edit = false;
      "
    ></v-text-field>
    <p v-else @click="edit = true">
      {{ item.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["item"],

  data() {
    return {
      edit: false,
      valueLocal: this.value,
    };
  },
  methods: {
    updateItem() {
      this.$store.dispatch(
        "DescriptionBuilderExperiencesModule/updateExperienceItem",
        this.item
      );
    },
  },

  watch: {
    value: function () {
      this.valueLocal = this.value;
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>