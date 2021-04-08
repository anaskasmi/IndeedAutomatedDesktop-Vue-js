<template>
  <v-card tile>
    <v-toolbar flat dark color="#2d6187" class="">
      <v-btn icon dark @click="showUpdateJobDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title style="font-weight: 900 !important"
        >Please Fill in the details that you want to apply on the selected jobs
        <div class="text-warning" style="font-size: 0.7em">
          Only fill the inputs that you need to update and ignore the other ones
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        tile
        color="#fdfffc"
        class="font-weight-bold"
        style="color: #4f5d75"
        @click="clearUpdateFormInputs"
      >
        <v-icon class="mr-3" small style="color: #4f5d75">
          mdi-trash-can-outline
        </v-icon>
        clear inputs
      </v-btn>
    </v-toolbar>
    <v-card-text class="mt-10">
      <v-stepper
        v-model="currentStep"
        non-linear
        style="font-weight: 900 !important"
      >
        <v-stepper-header>
          <v-stepper-step step="1" :complete="currentStep > 1" editable>
            General Info
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="currentStep > 2" editable>
            Salary
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="currentStep > 3" editable>
            Description
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="currentStep > 4" editable>
            Budget
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="currentStep > 5" editable>
            Confirmation
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <!-- company name -->
            <div class="px-0 mx-0">
              <div class="pl-0 ml-0">
                <v-text-field
                  :append-icon="
                    updateJobForm.companyName
                      ? 'mdi-checkbox-multiple-marked-outline '
                      : ''
                  "
                  :color="updateJobForm.companyName ? 'green' : ''"
                  label="Company name"
                  v-model="updateJobForm.companyName"
                ></v-text-field>
              </div>
              <!-- reason for name change -->
              <!-- <div class="col-6 pr-0 mr-0">
                    <v-text-field
                      :append-icon="
                        updateJobForm.reasonForCompanyNameChange
                          ? 'mdi-checkbox-multiple-marked-outline '
                          : ''
                      "
                      :color="
                        updateJobForm.reasonForCompanyNameChange ? 'green' : ''
                      "
                      label="Reason for company name change"
                      :disabled="!updateJobForm.companyName"
                      v-model="updateJobForm.reasonForCompanyNameChange"
                    ></v-text-field>
                  </div> -->
            </div>

            <!-- job title -->
            <v-text-field
              :append-icon="
                updateJobForm.jobTitle
                  ? 'mdi-checkbox-multiple-marked-outline '
                  : ''
              "
              :color="updateJobForm.jobTitle ? 'green' : ''"
              label="Job Title"
              v-model="updateJobForm.jobTitle"
            ></v-text-field>

            <!-- Where to advertise -->
            <div class="row col-12 justify-content-around px-0 mx-0">
              <div class="col-6 pl-0 ml-0">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      :append-icon="
                        updateJobForm.displayLocation
                          ? 'mdi-checkbox-multiple-marked-outline '
                          : ''
                      "
                      :color="updateJobForm.displayLocation ? 'green' : ''"
                      label="Where would you like to Advertise this job (city , state or country)"
                      v-model="updateJobForm.displayLocation"
                    ></v-text-field>
                  </template>
                  <span
                    >Please make sure that the location is correct by trying it
                    in Indeed it self first(at least once)</span
                  >
                </v-tooltip>
              </div>
              <!-- part time or full time ? -->
              <div class="col-6 pr-0 mr-0">
                <v-select
                  :append-icon="
                    updateJobForm.jobDetails_type
                      ? 'mdi-checkbox-multiple-marked-outline '
                      : ''
                  "
                  :color="updateJobForm.jobDetails_type ? 'green' : ''"
                  :items="['full-time', 'part-time']"
                  label="What type of job is it"
                  v-model="updateJobForm.jobDetails_type"
                ></v-select>
              </div>
            </div>
            <v-text-field
              :append-icon="
                updateJobForm.jobDetails_hiresNeeded
                  ? 'mdi-checkbox-multiple-marked-outline '
                  : ''
              "
              :color="updateJobForm.jobDetails_hiresNeeded ? 'green' : ''"
              type="number"
              label="How many Hires you want to make for this position"
              v-model="updateJobForm.jobDetails_hiresNeeded"
              @keypress="isNumber($event)"
              min="0"
            ></v-text-field>
            <v-btn
              color="#3d7ea6"
              dark
              large
              class="my-10"
              block
              tile
              @click="currentStep = 2"
            >
              Continue
            </v-btn>
          </v-stepper-content>

          <!-- step 2 salary -->
          <v-stepper-content step="2">
            <!-- salary range -->
            <v-select
              :append-icon="
                updateJobForm.jobDetails_salaryRangeType
                  ? 'mdi-checkbox-multiple-marked-outline '
                  : ''
              "
              :color="updateJobForm.jobDetails_salaryRangeType ? 'green' : ''"
              :items="['range', 'starting at', 'up to', 'exact rate']"
              label="Salary type"
              v-model="updateJobForm.jobDetails_salaryRangeType"
            ></v-select>
            <div class="row col-12 justify-content-between px-0 mx-0">
              <div class="col-3 pl-0 ml-0">
                <!-- salary from -->
                <v-text-field
                  :disabled="
                    updateJobForm.jobDetails_salaryRangeType == 'up to'
                  "
                  :append-icon="
                    updateJobForm.jobDetails_SalaryFrom
                      ? 'mdi-checkbox-multiple-marked-outline '
                      : ''
                  "
                  :color="updateJobForm.jobDetails_SalaryFrom ? 'green' : ''"
                  type="number"
                  label="From (In USD dollar)"
                  min="0"
                  @keypress="isNumberWithdots($event)"
                  v-model="updateJobForm.jobDetails_SalaryFrom"
                ></v-text-field>
              </div>
              <div class="col-3 pl-0 ml-0">
                <!-- salary to -->
                <v-text-field
                  :disabled="
                    updateJobForm.jobDetails_salaryRangeType != 'range' &&
                    updateJobForm.jobDetails_salaryRangeType != 'up to'
                  "
                  :append-icon="
                    updateJobForm.jobDetails_SalaryTo
                      ? 'mdi-checkbox-multiple-marked-outline '
                      : ''
                  "
                  :color="updateJobForm.jobDetails_SalaryTo ? 'green' : ''"
                  type="number"
                  label="To (In USD dollar)"
                  min="0"
                  @keypress="isNumberWithdots($event)"
                  v-model="updateJobForm.jobDetails_SalaryTo"
                ></v-text-field>
              </div>
              <div class="col-3 pl-0 ml-0">
                <!-- salary per -->
                <v-select
                  :append-icon="
                    updateJobForm.jobDetails_SalaryPer
                      ? 'mdi-checkbox-multiple-marked-outline '
                      : ''
                  "
                  :color="updateJobForm.jobDetails_SalaryPer ? 'green' : ''"
                  :items="[
                    'per hour',
                    'per day',
                    'per week',
                    'per month',
                    'per year',
                  ]"
                  label="Per"
                  v-model="updateJobForm.jobDetails_SalaryPer"
                ></v-select>
              </div>
            </div>

            <v-btn
              color="#3d7ea6"
              dark
              large
              class="my-10"
              block
              tile
              @click="currentStep = 3"
            >
              Continue
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <!-- job description -->
            <Editor
              style="font-weight: 400"
              v-model="jobDescriptionHtml"
              :imageProvider="{}"
              class="w-100 my-10"
              @input="updateResultedDescription"
            />

            <!-- preview -->
            <div
              :class="
                updateJobForm.newJobDescriptionHtml
                  ? 'border border-success  '
                  : 'border border-dark '
              "
            >
              <div
                class="text-center font-weight-bold my-3"
                style="font-weight: 900"
              >
                PREVIEW
              </div>
              <div
                v-html="updateJobForm.newJobDescriptionHtml"
                style="font-weight: 400"
                class="pa-10"
              ></div>
            </div>
            <v-btn
              color="#3d7ea6"
              dark
              large
              class="my-10"
              block
              tile
              @click="currentStep = 4"
            >
              Continue
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">
            <div class="row col-12 justify-content-between">
              <div class="col-5">
                <!-- Job budget  -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      :append-icon="
                        updateJobForm.budget_amount
                          ? 'mdi-checkbox-multiple-marked-outline '
                          : ''
                      "
                      :color="updateJobForm.budget_amount ? 'green' : ''"
                      label="Job budget ($)"
                      v-model="updateJobForm.budget_amount"
                      min="25"
                      @keypress="isNumberWithdots($event)"
                      type="number"
                    ></v-text-field>
                  </template>
                  <span>Minimum job budget amount is $25</span>
                </v-tooltip>
              </div>
              <div class="col-5">
                <!-- max CPC -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      :append-icon="
                        updateJobForm.budget_maxCPC
                          ? 'mdi-checkbox-multiple-marked-outline '
                          : ''
                      "
                      :color="updateJobForm.budget_maxCPC ? 'green' : ''"
                      label="Max cost per click ($)"
                      v-model="updateJobForm.budget_maxCPC"
                      min="0.15"
                      @keypress="isNumberWithdots($event)"
                      type="number"
                    ></v-text-field>
                  </template>
                  <span>Minimum amount of 'Max CPC' is $ 0.15</span>
                </v-tooltip>
              </div>
            </div>

            <v-col cols="12">
              <v-menu
                ref="budget_endDate_menu"
                v-model="budget_endDate_menu"
                :close-on-content-click="false"
                :return-value.sync="updateJobForm.budget_endDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <!-- budget end date -->
                  <v-text-field
                    :append-icon="
                      updateJobForm.budget_endDate
                        ? 'mdi-checkbox-multiple-marked-outline '
                        : 'mdi-calendar'
                    "
                    :color="updateJobForm.budget_endDate ? 'green' : ''"
                    v-model="updateJobForm.budget_endDate"
                    label="Budget End date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="updateJobForm.budget_endDate"
                  no-title
                  scrollable
                  :min="getTomorrowDate()"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="budget_endDate_menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.budget_endDate_menu.save(
                        updateJobForm.budget_endDate
                      )
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-btn
              color="#3d7ea6"
              dark
              large
              class="my-10"
              block
              tile
              @click="currentStep = 5"
            >
              Continue
            </v-btn>
          </v-stepper-content>

          <!-- step 5 -->
          <v-stepper-content step="5">
            <div>
              <!-- row 1 -->
              <div class="row col-12">
                <v-chip
                  v-if="updateJobForm.companyName"
                  class="ma-2"
                  color="green darken-4"
                  label
                  close
                  @click:close="updateJobForm.companyName = null"
                  text-color="white"
                >
                  <v-icon left> mdi-label </v-icon>

                  company name
                </v-chip>

                <v-chip
                  v-if="updateJobForm.jobTitle"
                  class="ma-2"
                  color="green darken-4"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.jobTitle = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Job Title
                </v-chip>

                <v-chip
                  v-if="updateJobForm.displayLocation"
                  class="ma-2"
                  color="green darken-4"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.displayLocation = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Job Location
                </v-chip>

                <v-chip
                  v-if="updateJobForm.jobDetails_type"
                  class="ma-2"
                  color="green darken-4"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.jobDetails_type = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Job Type
                </v-chip>

                <v-chip
                  v-if="updateJobForm.jobDetails_hiresNeeded"
                  class="ma-2"
                  color="green darken-4"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.jobDetails_hiresNeeded = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Number of hires needed
                </v-chip>
              </div>
              <!-- row 2 -->
              <div class="row col-12">
                <v-chip
                  v-if="updateJobForm.jobDetails_salaryRangeType"
                  class="ma-2"
                  color="indigo darken-3"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.jobDetails_salaryRangeType = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Salary type
                </v-chip>

                <v-chip
                  v-if="updateJobForm.jobDetails_SalaryFrom"
                  class="ma-2"
                  color="indigo darken-3"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.jobDetails_SalaryFrom = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Salary From
                </v-chip>
                <v-chip
                  v-if="updateJobForm.jobDetails_SalaryTo"
                  class="ma-2"
                  color="indigo darken-3"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.jobDetails_SalaryTo = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Salary To
                </v-chip>
                <v-chip
                  v-if="updateJobForm.jobDetails_SalaryPer"
                  class="ma-2"
                  color="indigo darken-3"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.jobDetails_SalaryPer = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Salary Per
                </v-chip>
              </div>
              <!-- row 3 -->
              <div class="row col-12">
                <v-chip
                  v-if="updateJobForm.newJobDescriptionHtml"
                  class="ma-2"
                  color="primary"
                  label
                  text-color="white"
                  close
                  @click:close="
                    jobDescriptionHtml = null;
                    updateJobForm.newJobDescriptionHtml = null;
                    jobDescriptionHtml = '';
                  "
                >
                  <v-icon left> mdi-label </v-icon>
                  Job Description
                </v-chip>
              </div>

              <!-- row 4 -->
              <div class="row col-12">
                <v-chip
                  v-if="updateJobForm.budget_amount"
                  class="ma-2"
                  color="cyan"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.budget_amount = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Job budget
                </v-chip>

                <v-chip
                  v-if="updateJobForm.budget_maxCPC"
                  class="ma-2"
                  color="cyan"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.budget_maxCPC = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Max CPC
                </v-chip>

                <v-chip
                  v-if="updateJobForm.budget_endDate"
                  class="ma-2"
                  color="cyan"
                  label
                  text-color="white"
                  close
                  @click:close="updateJobForm.budget_endDate = null"
                >
                  <v-icon left> mdi-label </v-icon>
                  Budget End Date
                </v-chip>
              </div>
            </div>

            <v-btn
              color="#086788"
              dark
              large
              class="my-10"
              block
              tile
              style="font-size: 1.2em; font-weight: 900"
              @click="updateAllSelectedJobs()"
            >
              Apply
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>

    <div style="flex: 1 1 auto"></div>
  </v-card>
</template>

<script>

export default {

}
</script>
