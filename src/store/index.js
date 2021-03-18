import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        BASE_URL: 'http://localhost:3000/api',
        jobs: [],
        selectedJobs: [],
        currentJob: null,
        isAllSelected: false,
        autoPilotMode: true,
        repostingSteps: {
            getJobFullDetails: 'notDone',
            openPostJobPage: 'notDone',
            unlockCompanyNameInput: 'notDone',
            fillIn_CompanyName: 'notDone',
            fillIn_JobTitle: 'notDone',
            fillIn_JobCategory: 'notDone',
            fillIn_RolesLocation: 'notDone',
            fillIn_IsJobremote: 'notDone',
            clickSaveAndContinue: 'notDone',
            fillIn_isJobFullTimeOrPartTime: 'notDone',
            fillIn_schedule: 'notDone',
            fillIn_hiresNumber: 'notDone',
            fillIn_deadline: 'notDone',
            fillIn_paymentType: 'notDone',
            fillIn_paymentFrom: 'notDone',
            fillIn_paymentTo: 'notDone',
            fillIn_paymentPer: 'notDone',
            fillIn_description: 'notDone',
            fillIn_isResumeRequired: 'notDone',
            click_confirm: 'notDone',
            click_advanced: 'notDone',
            fillIn_adDurationType: 'notDone',
            fillIn_CPC: 'notDone',
            fillIn_adBudget: 'notDone',
            closeJob: 'notDone',
        },
        failureMsgs: {
            getJobFullDetails: null,
            openPostJobPage: null,
            unlockCompanyNameInput: null,
            fillIn_CompanyName: null,
            fillIn_JobTitle: null,
            fillIn_JobCategory: null,
            fillIn_RolesLocation: null,
            fillIn_IsJobremote: null,
            clickSaveAndContinue: null,
            fillIn_isJobFullTimeOrPartTime: null,
            fillIn_schedule: null,
            fillIn_hiresNumber: null,
            fillIn_deadline: null,
            fillIn_paymentType: null,
            fillIn_paymentFrom: null,
            fillIn_paymentTo: null,
            fillIn_paymentPer: null,
            fillIn_description: null,
            fillIn_isResumeRequired: null,
            click_confirm: null,
            click_advanced: null,
            fillIn_adDurationType: null,
            fillIn_CPC: null,
            fillIn_adBudget: null,
            closeJob: null,
        },
    },
    getters: {
        getJobs: (state) => {
            return state.jobs;
        },
        getSelectedJobs: (state) => {
            return state.selectedJobs;
        },
        getIsAllSelected: (state) => {
            return state.isAllSelected;
        },
        getIsRepostingPageEnabled: (state) => {
            if (state.selectedJobs.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        getCurrentJob: (state) => {
            if (state.selectedJobs.length > 0) {
                state.currentJob = state.selectedJobs[0]
                return state.currentJob;
            } else {
                return null
            }
        },
        getQueueLength: (state) => {
            return state.selectedJobs.length;
        },
        getRepostingSteps: (state) => {
            return state.repostingSteps;
        },
        getFailureMsgs: (state) => {
            return state.failureMsgs;
        }
    },
    mutations: {
        setJobs(state, newVal) {
            state.jobs = newVal;
        },
        setSelectedJobs(state, newVal) {
            state.selectedJobs = newVal;
        },
        setIsAllSelected(state, newVal) {
            if (newVal == true) {
                state.selectedJobs = state.jobs;
                state.isAllSelected = newVal;
            } else {
                state.selectedJobs = [];
                state.isAllSelected = newVal;
            }
        },
        setCurrentJob(state, job) {
            state.selectedJobs[0] = job;
            state.currentJob = state.selectedJobs[0];
        },




    },
    actions: {
        execute_click_advanced({ state }) {
            state.repostingSteps.click_advanced = "doing";
            state.failureMsgs.click_advanced = null;
            let url = state.BASE_URL + "/jobs/click_advanced";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.click_advanced = "done";
                })
                .catch((error) => {
                    state.repostingSteps.click_advanced = "failed";
                    state.failureMsgs.click_advanced = error.response.data.error;
                    console.log(error);
                });
        },
        execute_click_confirm({ state }) {
            state.repostingSteps.click_confirm = "doing";
            state.failureMsgs.click_confirm = null;
            let url = state.BASE_URL + "/jobs/click_confirm";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.click_confirm = "done";
                })
                .catch((error) => {
                    state.repostingSteps.click_confirm = "failed";
                    state.failureMsgs.click_confirm = error.response.data.error;
                    console.log(error);
                });
        },
        execute_clickSaveAndContinue({ state }) {
            state.repostingSteps.clickSaveAndContinue = "doing";
            state.failureMsgs.clickSaveAndContinue = null;
            let url = state.BASE_URL + "/jobs/clickSaveAndContinue";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.clickSaveAndContinue = "done";
                })
                .catch((error) => {
                    state.repostingSteps.clickSaveAndContinue = "failed";
                    state.failureMsgs.clickSaveAndContinue = error.response.data.error;
                    console.log(error);
                });
        },
        execute_CloseJob({ state, getters }) {
            state.repostingSteps.CloseJob = "doing";
            state.failureMsgs.CloseJob = null;
            let url = state.BASE_URL + "/jobs/CloseJob";
            axios
                .post(url, { 'jobId': getters.getCurrentJob.job_id })
                .then(() => {
                    state.repostingSteps.CloseJob = "done";
                })
                .catch((error) => {
                    state.repostingSteps.CloseJob = "failed";
                    state.failureMsgs.CloseJob = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_adBudget({ state, getters }) {
            state.repostingSteps.fillIn_adBudget = "doing";
            state.failureMsgs.fillIn_adBudget = null;
            let url = state.BASE_URL + "/jobs/fillIn_adBudget";
            axios
                .post(url, { 'budget_amount': getters.getCurrentJob.budget_amount })
                .then(() => {
                    state.repostingSteps.fillIn_adBudget = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_adBudget = "failed";
                    state.failureMsgs.fillIn_adBudget = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_adDurationDate({ state }) {
            state.repostingSteps.fillIn_adDurationDate = "doing";
            state.failureMsgs.fillIn_adDurationDate = null;
            let url = state.BASE_URL + "/jobs/fillIn_adDurationDate";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.fillIn_adDurationDate = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_adDurationDate = "failed";
                    state.failureMsgs.fillIn_adDurationDate = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_adDurationType({ state }) {
            state.repostingSteps.fillIn_adDurationType = "doing";
            state.failureMsgs.fillIn_adDurationType = null;
            let url = state.BASE_URL + "/jobs/fillIn_adDurationType";
            axios
                .post(url)
                .then(() => {
                    state.repostingSteps.fillIn_adDurationType = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_adDurationType = "failed";
                    state.failureMsgs.fillIn_adDurationType = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_CompanyName({ state, getters }) {
            state.repostingSteps.fillIn_CompanyName = "doing";
            state.failureMsgs.fillIn_CompanyName = null;
            let url = state.BASE_URL + "/jobs/fillIn_CompanyName";
            axios
                .post(url, { companyName: getters.getCurrentJob.companyName })
                .then(() => {
                    state.repostingSteps.fillIn_CompanyName = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_CompanyName = "failed";
                    state.failureMsgs.fillIn_CompanyName = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_CPC({ state, getters }) {
            state.repostingSteps.fillIn_CPC = "doing";
            state.failureMsgs.fillIn_CPC = null;
            let url = state.BASE_URL + "/jobs/fillIn_CPC";
            axios
                .post(url, { 'budget_maxCPC': getters.getCurrentJob.budget_maxCPC })
                .then(() => {
                    state.repostingSteps.fillIn_CPC = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_CPC = "failed";
                    state.failureMsgs.fillIn_CPC = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_deadline({ state, getters }) {
            state.repostingSteps.fillIn_deadline = "doing";
            state.failureMsgs.fillIn_deadline = null;
            let url = state.BASE_URL + "/jobs/fillIn_deadline";
            axios
                .post(url, { 'jobDetails_expectedHireDate': getters.getCurrentJob.jobDetails_expectedHireDate })
                .then(() => {
                    state.repostingSteps.fillIn_deadline = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_deadline = "failed";
                    state.failureMsgs.fillIn_deadline = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_description({ state, getters }) {
            state.repostingSteps.fillIn_description = "doing";
            state.failureMsgs.fillIn_description = null;
            let url = state.BASE_URL + "/jobs/fillIn_description";
            axios
                .post(url, {
                    jobDescriptionHtml: getters.getCurrentJob.jobDescriptionHtml,
                }).then(() => {
                    state.repostingSteps.fillIn_description = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_description = "failed";
                    state.failureMsgs.fillIn_description = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_hiresNumber({ state, getters }) {
            state.repostingSteps.fillIn_hiresNumber = "doing";
            state.failureMsgs.fillIn_hiresNumber = null;
            let url = state.BASE_URL + "/jobs/fillIn_hiresNumber";
            axios
                .post(url, {
                    jobDetails_intHiresNeeded: getters.getCurrentJob.jobDetails_intHiresNeeded,
                })
                .then(() => {
                    state.repostingSteps.fillIn_hiresNumber = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_hiresNumber = "failed";
                    state.failureMsgs.fillIn_hiresNumber = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_isJobFullTimeOrPartTime({ state, getters }) {
            state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "doing";
            state.failureMsgs.fillIn_isJobFullTimeOrPartTime = null;
            let url = state.BASE_URL + "/jobs/fillIn_isJobFullTimeOrPartTime";
            axios
                .post(url, {
                    jobDetails_WhatTypeOfJobIsIt: getters.getCurrentJob
                        .jobDetails_WhatTypeOfJobIsIt,
                }).then(() => {
                    state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "failed";
                    state.failureMsgs.fillIn_isJobFullTimeOrPartTime = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_isResumeRequired({ state }) {
            state.repostingSteps.fillIn_isResumeRequired = "doing";
            state.failureMsgs.fillIn_isResumeRequired = null;
            let url = state.BASE_URL + "/jobs/fillIn_isResumeRequired";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.fillIn_isResumeRequired = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_isResumeRequired = "failed";
                    state.failureMsgs.fillIn_isResumeRequired = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_JobCategory({ state }) {
            state.repostingSteps.fillIn_JobCategory = "doing";
            state.failureMsgs.fillIn_JobCategory = null;
            let url = state.BASE_URL + "/jobs/fillIn_JobCategory";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.fillIn_JobCategory = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_JobCategory = "failed";
                    state.failureMsgs.fillIn_JobCategory = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_JobTitle({ state, getters }) {
            state.repostingSteps.fillIn_JobTitle = "doing";
            state.failureMsgs.fillIn_JobTitle = null;
            let url = state.BASE_URL + "/jobs/fillIn_JobTitle";
            axios
                .post(url, { jobTitle: getters.getCurrentJob.jobTitle })
                .then(() => {
                    state.repostingSteps.fillIn_JobTitle = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_JobTitle = "failed";
                    state.failureMsgs.fillIn_JobTitle = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_paymentFrom({ state, getters }) {
            state.repostingSteps.fillIn_paymentFrom = "doing";
            state.failureMsgs.fillIn_paymentFrom = null;
            let url = state.BASE_URL + "/jobs/fillIn_paymentFrom";
            axios
                .post(url, {
                    jobDetails_SalaryFrom: getters.getCurrentJob
                        .jobDetails_SalaryFrom,
                }).then(() => {
                    state.repostingSteps.fillIn_paymentFrom = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_paymentFrom = "failed";
                    state.failureMsgs.fillIn_paymentFrom = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_paymentPer({ state, getters }) {
            state.repostingSteps.fillIn_paymentPer = "doing";
            state.failureMsgs.fillIn_paymentPer = null;
            let url = state.BASE_URL + "/jobs/fillIn_paymentPer";
            axios
                .post(url, {
                    jobDetails_SalaryPer: getters.getCurrentJob
                        .jobDetails_SalaryPer,
                }).then(() => {
                    state.repostingSteps.fillIn_paymentPer = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_paymentPer = "failed";
                    state.failureMsgs.fillIn_paymentPer = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_paymentTo({ state, getters }) {
            state.repostingSteps.fillIn_paymentTo = "doing";
            state.failureMsgs.fillIn_paymentTo = null;
            let url = state.BASE_URL + "/jobs/fillIn_paymentTo";
            axios
                .post(url, {
                    jobDetails_SalaryTo: getters.getCurrentJob
                        .jobDetails_SalaryTo,
                    jobDetails_salaryRangeType: getters.getCurrentJob
                        .jobDetails_salaryRangeType
                }).then(() => {
                    state.repostingSteps.fillIn_paymentTo = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_paymentTo = "failed";
                    state.failureMsgs.fillIn_paymentTo = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_paymentType({ state, getters }) {
            state.repostingSteps.fillIn_paymentType = "doing";
            state.failureMsgs.fillIn_paymentType = null;
            let url = state.BASE_URL + "/jobs/fillIn_paymentType";
            axios
                .post(url, {
                    jobDetails_salaryRangeType: getters.getCurrentJob
                        .jobDetails_salaryRangeType,
                }).then(() => {
                    state.repostingSteps.fillIn_paymentType = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_paymentType = "failed";
                    state.failureMsgs.fillIn_paymentType = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_RolesLocation({ state, getters }) {
            let locationArray = getters.getCurrentJob.displayLocation[0].location.split(
                ", "
            );
            let city = locationArray[0];
            let stateName = locationArray[1];

            state.repostingSteps.fillIn_RolesLocation = "doing";
            state.failureMsgs.fillIn_RolesLocation = null;
            let url = state.BASE_URL + "/jobs/fillIn_RolesLocation";
            axios
                .post(url, { location: { "city": city, "state": stateName } })
                .then(() => {
                    state.repostingSteps.fillIn_RolesLocation = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_RolesLocation = "failed";
                    state.failureMsgs.fillIn_RolesLocation = error.response.data.error;
                    console.log(error);
                });
        },
        execute_fillIn_schedule({ state }) {
            state.repostingSteps.fillIn_schedule = "doing";
            state.failureMsgs.fillIn_schedule = null;
            let url = state.BASE_URL + "/jobs/fillIn_schedule";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.fillIn_schedule = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_schedule = "failed";
                    state.failureMsgs.fillIn_schedule = error.response.data.error;
                    console.log(error);
                });
        },
        execute_getJobFullDetails({ state, getters }) {
            state.repostingSteps.getJobFullDetails = "doing";
            state.failureMsgs.getJobFullDetails = null;
            let url = state.BASE_URL + "/jobs/getJobFullDetails";
            axios
                .post(url, { job_id: getters.getCurrentJob.job_id })
                .then(() => {
                    state.repostingSteps.getJobFullDetails = "done";
                })
                .catch((error) => {
                    state.repostingSteps.getJobFullDetails = "failed";
                    state.failureMsgs.getJobFullDetails = error.response.data.error;
                    console.log(error);
                });
        },
        execute_openPostJobPage({ state }) {
            state.repostingSteps.openPostJobPage = "doing";
            state.failureMsgs.openPostJobPage = null;
            let url = state.BASE_URL + "/jobs/openPostJobPage";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.openPostJobPage = "done";
                })
                .catch((error) => {
                    state.repostingSteps.openPostJobPage = "failed";
                    state.failureMsgs.openPostJobPage = error.response.data.error;
                    console.log(error);
                });
        },

        execute_unlockCompanyNameInput({ state }) {
            state.repostingSteps.unlockCompanyNameInput = "doing";
            state.failureMsgs.unlockCompanyNameInput = null;
            let url = state.BASE_URL + "/jobs/unlockCompanyNameInput";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.unlockCompanyNameInput = "done";
                })
                .catch((error) => {
                    state.repostingSteps.unlockCompanyNameInput = "failed";
                    state.failureMsgs.unlockCompanyNameInput = error.response.data.error;
                    console.log(error);
                });
        },

    },
    modules: {}
})