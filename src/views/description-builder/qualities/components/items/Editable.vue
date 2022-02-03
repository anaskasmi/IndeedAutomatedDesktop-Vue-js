<template>
  <div class="my-4">
    <v-text-field
      solo-inverted
      prepend-icon="mdi-pencil"
      hint="click ENTER to save, or ESC to cancel"
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
      @keyup.esc="
        edit = false;
        fetchItems();
      "
    ></v-text-field>
    <p v-else>
      <span  v-on:dblclick="edit = true">
        {{ item.name }}
      </span>
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
      try {
        this.$store.dispatch(
          "DescriptionBuilderQualitiesModule/updateQualityItem",
          this.item
        );
        this.$store.commit("showSuccessNotification", "Updated successfully!");
      } catch (error) {
        this.$store.commit("showErrorNotification", error);
      }
    },
    fetchItems() {
      try {
        this.$store.dispatch(
          "DescriptionBuilderQualitiesModule/fetchQualitiesItems",
          this.item
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