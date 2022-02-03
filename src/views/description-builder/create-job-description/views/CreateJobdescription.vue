<template>
  <div>
    <v-row class="col-12">
      <v-col>
        <v-card outlined elevation="0">
          <v-card-title>
            <v-row class="col-12" justify="space-between">
              <div>Description Builder</div>
              <div>
                <v-btn dark text color="info">
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
            <v-divider></v-divider>
            <CompanyCulture />
            <v-divider></v-divider>
            <CompanyAndPosition />
            <v-divider></v-divider>
            <CompanyDescription />
            <v-divider></v-divider>
            <CandidateDescription />
            <v-divider></v-divider>
            <Positions />
            <v-divider></v-divider>
            <Compensations />
            <v-divider></v-divider>
            <Incentives />
            <v-divider></v-divider>
            <Experiences />
            <v-divider></v-divider>
            <Qualities />
            <v-divider></v-divider>
            <ApplyMethods />
            <v-divider></v-divider>
            <Signature />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined elevation="0">
          <v-card-title>
            <v-row class="col-12" justify="space-between">
              <div>Preview</div>
              <div>
                <v-btn dark color="green">
                  <v-icon class="mr-2" small>mdi-content-copy</v-icon>
                  Copy
                </v-btn>
              </div>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text> <Preview /> </v-card-text>
        </v-card>
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
import Preview from "@/views/description-builder/create-job-description/components/Preview.vue";
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
    Preview,
  },
};
</script>