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
            <v-btn
              depressed
              dark
              class="ml-2"
              color="info"
              @click="savePosting"
            >
              <v-icon class="mr-2" small>mdi-file-download</v-icon>
              Save Job
            </v-btn>
          </div>
        </v-row>
        <v-row class="col-12" no-gutters>
          <v-text-field
            hide-details
            v-model="job.name"
            label="title"
            solo-inverted
          ></v-text-field>
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
import jobDescriptionMixin from "@/views/description-builder/create-job-description/mixins/jobDescriptionMixin.js";
import JobMixin from "@/views/description-builder/create-job-description/mixins/jobMixin.js";

export default {
  mixins: [jobDescriptionMixin, JobMixin],
  props: ["posting", "showActions"],
  data: () => {
    return {
      editorConfig: {
        toolbar: [["Bold"], ["Italic"], ["BulletedList"]],
        copyFormatting_allowedContexts: true,
      },
    };
  },
  methods: {
    async savePosting() {
      this.isLoading = true;
      try {
        await this.$store.dispatch(
          "DescriptionBuilderPostingsModule/createPosting",
          this.job
        );
        this.showSuccessMessage("Saved successfully");
      } catch (error) {
        this.$swal.fire({
          title: "Something went wrong, Posting was not saved",
          message: error.message,
          icon: "error",
          type: "error",
          confirmButtonColor: "#EF6D6D",
        });
        console.log(error);
      } finally {
        this.collectInfoStepperIsVisible = false;
        this.isLoading = false;
      }
    },
    showSuccessMessage(message = "success") {
      this.$swal.fire({
        title: message,
        icon: "success",
        confirmButtonColor: "#7CD1B8",
      });
    },
  },
};
</script>