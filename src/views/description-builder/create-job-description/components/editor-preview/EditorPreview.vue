<template>
  <div class="col-12 pa-0">
    <v-card :outlined="showActions" elevation="0">
      <v-card-title v-if="showActions">
        <v-row class="col-12" justify="space-between">
          <div>Preview</div>
          <div>
            <v-btn dark depressed color="green" @click="copyDescription">
              <v-icon class="mr-2" small>mdi-content-copy</v-icon>
              Copy
            </v-btn>
            <v-btn depressed dark class="ml-2" color="info">
              <v-icon class="mr-2" small>mdi-file-download</v-icon>
              Save Job
            </v-btn>
          </div>
        </v-row>
      </v-card-title>
      <v-divider v-if="showActions"></v-divider>
      <v-card-text>
        <ckeditor :value="description" :config="editorConfig"></ckeditor>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  computed: {
    description() {
      return (
        `${this.getApplyOnlyHtml()}${this.getCompanyCultureHtml()}` +
        `${this.getJobOpeningHtml()}` +
        `${this.getCompanyDescriptionHtml()}` +
        `${this.getCandidateDescriptionHtml()}` +
        `${this.getPositionsHtml()}` +
        `${this.getCompensationsHtml()}` +
        `${this.getIncentivesHtml()}` +
        `${this.getExperiencesHtml()}` +
        `${this.getQualitiesHtml()}` +
        `${this.getHTAHtml()}` +
        `${this.getSignatureHtml()}` +
        `${this.getTagsHtml()}`
      );
    },
  },
  props: ["job", "showActions"],
  data: () => {
    return {
      editorConfig: {
        toolbar: [["Bold"], ["Italic"], ["BulletedList"]],
        copyFormatting_allowedContexts: true,
      },
    };
  },
  methods: {
    async copyDescription() {
      try {
        await navigator.clipboard.writeText(this.description);
        this.$store.commit("showSuccessNotification", "Copied successfully!");
      } catch (error) {
        this.$store.commit("showErrorNotification", error);
      }
    },
    arrayToList(array) {
      if (array && array.length > 0)
        return array.join(", ").replace(/, ((?:.(?!, ))+)$/, " and $1");
    },
    arrayToListWithSymbol(array) {
      if (array && array.length > 0)
        return array.join(", ").replace(/, ((?:.(?!, ))+)$/, " & $1");
    },
    getApplyOnlyHtml() {
      if (!this.job.applyOnly) return "";
      let result = "<p><b>";
      result = result + "*Apply only if you ";
      result = result + this.job.applyOnly;
      result = result + "*</b></p>";
      return result;
    },
    getJobOpeningHtml() {
      if (!this.job || !this.job.company || !this.job.company.name) return "";
      let result = "<p>";
      result = result + "<b>";
      result = result + (this.job.company.name || "");
      result = result + "</b>";
      result = result + " in ";
      result = result + "<b>";
      result = result + (this.job.company.city || "");
      result = result + ", ";
      result = result + (this.job.company.state || "");
      result = result + "</b>";
      result = result + " is seeking ";
      result = result + (this.job.roleDescription || "");
      result = result + " ";
      result = result + (this.arrayToList(this.job.positions) || "");
      result = result + ".";
      result = result + "</p>";
      return result;
    },
    getCandidateDescriptionHtml() {
      if (!this.job.candidateDescription) return "";
      let result = "<p>";
      result = result + "The ideal candidate ";
      result = result + (this.job.candidateDescription || "");
      result = result + "</p>";
      return result;
    },

    getCompanyDescriptionHtml() {
      if (!this.job || !this.job.company || !this.job.company.name) return "";
      let result = "<p>";
      result = result + "<b>";
      result = result + (this.job.company.name || "");
      result = result + "</b> is ";
      result = result + (this.job.company.description || "");
      result = result + ".";
      result = result + "</p>";
      return result;
    },
    getCompanyCultureHtml() {
      if (!this.job || !this.job.company || !this.job.company.culture)
        return "";
      let result = "";
      result = result + "<b>Company culture: </b>";
      result = result + this.job.company.culture;
      return result;
    },

    getPositionsHtml() {
      if (!this.job.positions || !this.job.positions.length) return "";
      let result = "<b>Positions: </b>";
      result = result + "<ul>";
      for (const position of this.job.positions) {
        result = result + "<li>";
        result = result + position;
        result = result + "</li>";
      }
      result = result + "</ul>";
      return result;
    },
    getCompensationsHtml() {
      if (!this.job.compensations || !this.job.compensations.length) return "";
      let result = "<b>Compensation: </b>";
      result = result + "<ul>";
      for (const compensation of this.job.compensations) {
        result = result + "<li>";
        result = result + compensation;
        result = result + "</li>";
      }
      result = result + "</ul>";
      return result;
    },
    getIncentivesHtml() {
      if (!this.job.incentives || !this.job.incentives.length) return "";
      let result = "<b>Incentives: </b>";
      result = result + "<ul>";
      for (const incentive of this.job.incentives) {
        result = result + "<li>";
        result = result + incentive;
        result = result + "</li>";
      }
      result = result + "</ul>";
      return result;
    },
    getExperiencesHtml() {
      if (!this.job.experiences || !this.job.experiences.length) return "";
      let result = "<b>Experiences: </b>";
      result = result + "<ul>";
      for (const experience of this.job.experiences) {
        result = result + "<li>";
        result = result + experience;
        result = result + "</li>";
      }
      result = result + "</ul>";
      return result;
    },
    getQualitiesHtml() {
      if (!this.job.qualities || !this.job.qualities.length) return "";
      let result = "<b>Qualities: </b>";
      result = result + "<ul>";
      for (const quality of this.job.qualities) {
        result = result + "<li>";
        result = result + quality;
        result = result + "</li>";
      }
      result = result + "</ul>";
      return result;
    },
    getHTAHtml() {
      if (!this.job.applyMethods || !this.job.applyMethods.length) return "";
      let result = "<b>How To Apply: </b>";

      result = result + "<ul>";
      for (const applyMethod of this.job.applyMethods) {
        result = result + "<li>";
        result = result + applyMethod;
        result = result + "</li>";
      }
      result = result + "</ul>";
      return result;
    },
    getSignatureHtml() {
      if (!this.job.signature || !this.job.showSignature) return "";
      let result = "<p><b>";
      result = result + this.job.signature;
      result = result + "</b></p>";
      return result;
    },
    getTagsHtml() {
      if (!this.job.tags) return "";
      let result = "<p>";
      result = result + this.job.tags;
      result = result + "</p>";
      return result;
    },
  },
};
</script>