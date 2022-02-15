<template>
  <v-card class="pa-16">
    <v-card-text>
      <div class="akaya pb-4" style="font-size: 20px; color: #30475e">
        Can you describe your candidate in one word :
      </div>
      <v-row align="center" class="col-12">
        <v-combobox
          hide-details
          clearable
          light
          v-model="job.roleDescription"
          label="Role Desc"
          autocomplete="nope"
          :items="roleDescriptions"
          item-text="name"
          item-value="name"
          :return-object="false"
          :loading="isLoading"
          :disabled="isLoading"
          chips
        ></v-combobox>
      </v-row>
    </v-card-text>
  </v-card>
</template><script>
export default {
  created() {
    this.fetchRoleDescriptions();
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    job: {
      get: function () {
        return this.$store.getters["DescriptionBuilderTemplateModule/job"];
      },
      set: function (newVal) {
        this.$store.commit("DescriptionBuilderTemplateModule/job", newVal);
      },
    },
    roleDescriptions: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptions"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderRoleDescriptionsModule/roleDescriptions",
          newVal
        );
      },
    },
  },
  methods: {
    async fetchRoleDescriptions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderRoleDescriptionsModule/fetchRoleDescriptions"
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>