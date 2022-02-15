<template>
  <div>
    <v-row class="col-12">
      <v-col :cols="isExpanded ? 12 : 6">
        <v-card outlined elevation="0">
          <v-card-title>
            <v-row class="col-12" justify="space-between">
              <div>Description Builder</div>
              <div>
                <v-btn dark text color="info" @click="isExpanded = !isExpanded">
                  <v-icon class="mr-2" color="primary"
                    >mdi-arrow-expand-horizontal</v-icon
                  >
                  Expand
                </v-btn>
              </div>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <ApplyOnly />
            <CompanyCulture />
            <CompanyAndPosition />
            <CompanyDescription />
            <CandidateDescription />
            <Positions />
            <Compensations />
            <Incentives />
            <Experiences />
            <Qualities />
            <ApplyMethods />
            <Signature />
            <Tags />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="isExpanded ? 12 : 6">
        <EditorPreview />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import ApplyOnly from "@/views/description-builder/create-job-description/components/ApplyOnlyRow.vue";
import CompanyCulture from "@/views/description-builder/create-job-description/components/CompanyCulture.vue";
import CompanyAndPosition from "@/views/description-builder/create-job-description/components/CompanyAndPosition.vue";
import CompanyDescription from "@/views/description-builder/create-job-description/components/CompanyDescription.vue";
import CandidateDescription from "@/views/description-builder/create-job-description/components/CandidateDescription.vue";
import Positions from "@/views/description-builder/create-job-description/components/Positions.vue";
import Compensations from "@/views/description-builder/create-job-description/components/Compensations.vue";
import Incentives from "@/views/description-builder/create-job-description/components/Incentives.vue";
import Experiences from "@/views/description-builder/create-job-description/components/Experiences.vue";
import Qualities from "@/views/description-builder/create-job-description/components/Qualities.vue";
import ApplyMethods from "@/views/description-builder/create-job-description/components/ApplyMethods.vue";
import Signature from "@/views/description-builder/create-job-description/components/Signature.vue";
import Tags from "@/views/description-builder/create-job-description/components/Tags.vue";
import EditorPreview from "@/views/description-builder/create-job-description/components/editor-preview/EditorPreview.vue";

export default {
  components: {
    ApplyOnly,
    CompanyCulture,
    CompanyAndPosition,
    CompanyDescription,
    CandidateDescription,
    Positions,
    Compensations,
    Incentives,
    Experiences,
    Qualities,
    ApplyMethods,
    Signature,
    Tags,
    EditorPreview,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
   
  },
};
</script>