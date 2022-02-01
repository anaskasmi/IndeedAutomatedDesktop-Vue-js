<template>
  <div class="my-4 col-4">
    <v-text-field
      solo-inverted
      prepend-icon="mdi-pencil"
      hint="click ENTER to save, or ESC to cancel"
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
      @keyup.esc="
        edit = false;
        fetchSets();
      "
    ></v-text-field>
    <div class="font-weight-bold text-uppercase text-edit-mouse" v-else>
      <span v-on:dblclick.stop="edit = true">
        {{ set.name }}
      </span>
    </div>
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
    async updateSet() {
      try {
        await this.$store.dispatch(
          "DescriptionBuilderPositionsModule/updateSet",
          this.set
        );
        this.$store.commit("showSuccessNotification", "Updated successfully!");
      } catch (error) {
        this.$store.commit("showErrorNotification", error);
      }
    },
    async fetchSets() {
      try {
        await this.$store.dispatch(
          "DescriptionBuilderPositionsModule/fetchSets",
          this.set
        );
      } catch (error) {
        this.$store.commit("showErrorNotification", error);
      }
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

<style scoped>
.text-edit-mouse {
  cursor: text;
}
</style>