<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        fullscreen
        v-model="collectInfoStepperIsVisible"
        transition="dialog-bottom-transition"
        max-width="800"
        persistent
      >
        <v-card>
          <v-toolbar class="font-weight-bold" color="#30475E" dark
            >✨ Let's build your job posting ({{ currentStep }}/{{
              stepsTotal
            }})✨
            <v-spacer></v-spacer>
            <v-btn text small @click="collectInfoStepperIsVisible = false"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-toolbar>
          <v-card-text>
            <v-stepper v-model="currentStep" class="elevation-0 ma-4">
              <v-stepper-items>
                <v-stepper-content step="1">
                  <CompanyInfo />
                </v-stepper-content>
                <v-stepper-content step="2">
                  <JobType />
                </v-stepper-content>
                <v-stepper-content step="3">
                  <CandidateShortDescription />
                </v-stepper-content>
                <v-stepper-content step="4">
                  <CandidateLongDescription />
                </v-stepper-content>
                <v-stepper-content step="5">
                  <Positions />
                </v-stepper-content>
                <v-stepper-content step="6">
                  <Incentives />
                </v-stepper-content>
                <v-stepper-content step="7">
                  <Compensations />
                </v-stepper-content>
                <v-stepper-content step="8">
                  <Experiences />
                </v-stepper-content>
                <v-stepper-content step="9">
                  <Qualities />
                </v-stepper-content>
                <v-stepper-content step="10">
                  <ApplyMethods />
                </v-stepper-content>
                <v-stepper-content step="11">
                  <Tags />
                </v-stepper-content>
                <v-stepper-content step="12">
                  <Signature />
                </v-stepper-content>
                <v-stepper-content step="13">
                  <SaveJobPosting />
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
          <v-card-actions class="pa-10">
            <v-btn
              @click="currentStep--"
              v-if="currentStep > 1"
              small
              depressed
              fab
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              @click="currentStep++"
              v-if="currentStep < stepsTotal"
              small
              color="info"
              depressed
              fab
              ><v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import CompanyInfo from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/CompanyInfo.vue";
import JobType from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/JobType.vue";
import CandidateShortDescription from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/CandidateShortDescription.vue";
import CandidateLongDescription from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/CandidateLongDescription.vue";
import Positions from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/Positions.vue";
import Compensations from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/Compensations.vue";
import Incentives from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/Incentives.vue";
import Experiences from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/Experiences.vue";
import Qualities from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/Qualities.vue";
import ApplyMethods from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/ApplyMethods.vue";
import Tags from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/Tags.vue";
import Signature from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/Signature.vue";
import SaveJobPosting from "@/views/description-builder/create-job-description/components/collect-info-stepper/steps/SaveJobPosting.vue";
export default {
  data() {
    return {
      currentStep: 1,
      stepsTotal: 13,
    };
  },
  components: {
    CompanyInfo,
    JobType,
    CandidateShortDescription,
    CandidateLongDescription,
    Positions,
    Compensations,
    Incentives,
    Experiences,
    Qualities,
    ApplyMethods,
    Tags,
    Signature,
    SaveJobPosting,
  },
  computed: {
    collectInfoStepperIsVisible: {
      get: function () {
        return this.$store.getters[
          "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible"
        ];
      },
      set: function (newVal) {
        this.$store.commit(
          "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible",
          newVal
        );
      },
    },
  },
};
</script>