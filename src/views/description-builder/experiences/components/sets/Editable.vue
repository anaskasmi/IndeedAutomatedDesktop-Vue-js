<template>
  <div class="my-4">
    <v-text-field
      outlined
      v-if="edit"
      dense
      v-model="set.name"
      @blur.native="
        updateSet();
        edit = false;
      "
      @keyup.enter.native="
        updateSet();
        edit = false;
      "
    ></v-text-field>
    <p v-else @click="edit = true">
      {{ set.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["set"],

  data() {
    return {
      edit: false,
      valueLocal: this.value,
    };
  },
  methods: {
    updateSet() {
      this.$store.dispatch(
        "DescriptionBuilderExperiencesModule/updateSet",
        this.set
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