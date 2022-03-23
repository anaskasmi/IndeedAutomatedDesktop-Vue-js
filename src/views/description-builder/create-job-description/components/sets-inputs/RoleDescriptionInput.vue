<template >
  <v-combobox
    :solo-inverted="isSoloInverted"
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
</template>

<script>
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";
import roleDescriptionsMixin from "@/views/description-builder/create-job-description/mixins/roleDescriptionsMixin.js";

export default {
  mixins: [JobMixin, roleDescriptionsMixin],
  props: ["isSoloInverted"],
};
</script>