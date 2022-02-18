<template>
  <div>
    <v-row justify="center" class="col-12">
      <v-img
        height="140"
        width="140"
        contain
        :src="require('@/assets/img/logo.png')"
      >
      </v-img>
    </v-row>
    <v-divider class="mx-12"></v-divider>
    <div class="col d-flex justify-content-center px-12">
      <v-container>
        <v-row>
          <v-col class="col-lg-4 col-md-6 col-sm-12 " v-for="link in links" :key="link.name">
            <router-link :to="link.route">
              <v-hover v-slot="{ hover }">
                <v-card
                  rounded="lg"
                  :elevation="hover ? 3 : 0"
                  :class="{ 'on-hover ': hover }"
                  class="pa-10 grow"
                >
                  <v-card-text>
                    <v-img
                      class="mx-auto"
                      height="130"
                      width="130"
                      :src="link.icon"
                    >
                    </v-img>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions class="text-center">
                    <div
                      style="font-size: 20px"
                      class="
                        text-info text--darken-3
                        mx-auto
                        font-weight-bold
                        text-uppercase
                        font-poppins
                        grow
                      "
                    >
                      {{ link.name }}
                      <div
                        class="grey--text font-weight-light"
                        style="font-size: 12px"
                      >
                        {{ link.description }}
                      </div>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      links: [
        {
          name: "Jobs Reposter",
          route: { name: "JobsReposter" },
          description: "Repost jobs on Indeed",
          icon: require("@/assets/img/repost.png"),
        },
        {
          name: "Jobs Editor",
          route: { name: "JobsEditor" },
          description: "Bullk Edit jobs on Indeed",
          icon: require("@/assets/img/update.png"),
        },
        {
          name: "Resume Transfer",
          route: { name: "ResumeTransfer" },
          description: "Transfer Resumes from Indeed to Crelate",
          icon: require("@/assets/img/resume.png"),
        },
        {
          name: "Crelate Reports",
          route: { name: "CrealetReports" },
          description: "Export Crealet reports",
          icon: require("@/assets/img/crealet-report.png"),
        },
        {
          name: "Invoice genrator",
          route: { name: "IndeedInvoices" },
          description: "Export Indeed Invoices, by job numbers",
          icon: require("@/assets/img/invoice.png"),
        },
        {
          name: "Description builder",
          route: { name: "descriptionBuilder.home" },
          description: "To help you build Job descriptions ",
          icon: require("@/assets/img/job-builder.png"),
        },
      ],
    };
  },
  methods: {},
};
</script>

<style >
a {
  text-decoration: none !important;
}
a:link {
  text-decoration: none !important;
}
a:hover {
  text-decoration: none im !important;
}
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
}
</style>
