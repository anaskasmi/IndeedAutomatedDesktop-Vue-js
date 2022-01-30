<template>
  <v-card elevation="0" rounded="lg" class="my-4">
    <v-tabs fixed-tabs centered v-model="tab" background-color="#072227" dark>
      <v-tab> Items </v-tab>
      <v-tab> Sets </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item> <Items /></v-tab-item>
      <v-tab-item> <Sets /> </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import Items from "@/views/description-builder/experiences/components/Items.vue";
import Sets from "@/views/description-builder/experiences/components/sets/Sets.vue";
export default {
  components: { Items, Sets },
  data: () => {
    return {
      tab: null,
    };
  },
  computed: {},
  methods: {},
};
</script>
