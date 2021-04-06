import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        BASE_URL: 'http://localhost:3009/api',
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
            fillIn_adDurationDate: 'notDone',
            fillIn_CPC: 'notDone',
            fillIn_adBudget: 'notDone',
            CloseJob: 'notDone',
            fillIn_email: 'notDone',
            close_questions: 'notDone',
            fillIn_isJobRemote: 'notDone',
            fillIn_otherBenefits: 'notDone',
            RepostNextJobComponent: 'notDone',
            fillIn_webSite: 'notDone',
            fillIn_salaryFromAndTo: 'notDone',
            fillIn_industry: 'notDone',
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
            fillIn_adDurationDate: null,
            fillIn_CPC: null,
            fillIn_adBudget: null,
            CloseJob: null,
            fillIn_email: null,
            close_questions: null,
            fillIn_isJobRemote: null,
            fillIn_otherBenefits: null,
            RepostNextJobComponent: null,
            fillIn_webSite: null,
            fillIn_salaryFromAndTo: null,
            fillIn_industry: null,

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
        },
        doesJobHasFullDetails: (state) => {
            return (state.currentJob.jobDetails_type != null)
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


        startRepostingTheNextJob(state) {
            //remove job 0 from selected jobs
            state.selectedJobs.shift();
            state.currentJob = state.selectedJobs[0];
            //reset steps
            state.repostingSteps = {
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
                fillIn_adDurationDate: 'notDone',
                fillIn_CPC: 'notDone',
                fillIn_adBudget: 'notDone',
                CloseJob: 'notDone',
                fillIn_email: 'notDone',
                close_questions: 'notDone',
                fillIn_isJobRemote: 'notDone',
                fillIn_otherBenefits: 'notDone',
                RepostNextJobComponent: 'notDone',
                fillIn_webSite: 'notDone',
                fillIn_salaryFromAndTo: 'notDone',
                fillIn_industry: 'notDone',
            };

            //reset feilure messages
            state.failureMsgs = {
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
                fillIn_adDurationDate: null,
                fillIn_CPC: null,
                fillIn_adBudget: null,
                CloseJob: null,
                fillIn_email: null,
                close_questions: null,
                fillIn_isJobRemote: null,
                fillIn_otherBenefits: null,
                RepostNextJobComponent: null,
                fillIn_webSite: null,
                fillIn_salaryFromAndTo: null,
                fillIn_industry: null,
            };
        },


    },
    actions: {
        execute_click_advanced({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.click_advanced = "doing";
                state.failureMsgs.click_advanced = null;
                let url = state.BASE_URL + "/jobs/click_advanced";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.click_advanced = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.click_advanced = "failed";
                        state.failureMsgs.click_advanced = error.response.data.error;
                        console.log(error);
                        rej();
                    });
            })

        },
        execute_click_confirm({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.click_confirm = "doing";
                state.failureMsgs.click_confirm = null;
                let url = state.BASE_URL + "/jobs/click_confirm";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.click_confirm = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.click_confirm = "failed";
                        state.failureMsgs.click_confirm = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_clickSaveAndContinue({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.clickSaveAndContinue = "doing";
                state.failureMsgs.clickSaveAndContinue = null;
                let url = state.BASE_URL + "/jobs/clickSaveAndContinue";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.clickSaveAndContinue = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.clickSaveAndContinue = "failed";
                        state.failureMsgs.clickSaveAndContinue = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_CloseJob({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.CloseJob = "doing";
                state.failureMsgs.CloseJob = null;
                let url = state.BASE_URL + "/jobs/CloseJob";
                axios
                    .post(url, { 'jobId': getters.getCurrentJob.job_id })
                    .then(() => {
                        state.repostingSteps.CloseJob = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.CloseJob = "failed";
                        state.failureMsgs.CloseJob = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_adBudget({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_adBudget = "doing";
                state.failureMsgs.fillIn_adBudget = null;
                let url = state.BASE_URL + "/jobs/fillIn_adBudget";
                axios
                    .post(url, { 'budget_amount': getters.getCurrentJob.budget_amount })
                    .then(() => {
                        state.repostingSteps.fillIn_adBudget = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_adBudget = "failed";
                        state.failureMsgs.fillIn_adBudget = error.response.data.error;
                        console.log(error);
                        rej();
                    });
            })

        },
        execute_fillIn_adDurationDate({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_adDurationDate = "doing";
                state.failureMsgs.fillIn_adDurationDate = null;
                let url = state.BASE_URL + "/jobs/fillIn_adDurationDate";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.fillIn_adDurationDate = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_adDurationDate = "failed";
                        state.failureMsgs.fillIn_adDurationDate = error.response.data.error;
                        console.log(error);
                        rej();
                    });
            })

        },
        execute_fillIn_adDurationType({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_adDurationType = "doing";
                state.failureMsgs.fillIn_adDurationType = null;
                let url = state.BASE_URL + "/jobs/fillIn_adDurationType";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.fillIn_adDurationType = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_adDurationType = "failed";
                        state.failureMsgs.fillIn_adDurationType = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_CompanyName({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_CompanyName = "doing";
                state.failureMsgs.fillIn_CompanyName = null;
                let url = state.BASE_URL + "/jobs/fillIn_CompanyName";
                axios
                    .post(url, { companyName: getters.getCurrentJob.companyName })
                    .then(() => {
                        state.repostingSteps.fillIn_CompanyName = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_CompanyName = "failed";
                        state.failureMsgs.fillIn_CompanyName = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_fillIn_CPC({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_CPC = "doing";
                state.failureMsgs.fillIn_CPC = null;
                let url = state.BASE_URL + "/jobs/fillIn_CPC";
                axios
                    .post(url, { 'budget_maxCPC': getters.getCurrentJob.budget_maxCPC })
                    .then(() => {
                        state.repostingSteps.fillIn_CPC = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_CPC = "failed";
                        state.failureMsgs.fillIn_CPC = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_deadline({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_deadline = "doing";
                state.failureMsgs.fillIn_deadline = null;
                let url = state.BASE_URL + "/jobs/fillIn_deadline";
                axios
                    .post(url, { 'jobDetails_expectedHireDate': getters.getCurrentJob.jobDetails_expectedHireDate })
                    .then(() => {
                        state.repostingSteps.fillIn_deadline = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_deadline = "failed";
                        state.failureMsgs.fillIn_deadline = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_description({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_description = "doing";
                state.failureMsgs.fillIn_description = null;
                let url = state.BASE_URL + "/jobs/fillIn_description";
                axios
                    .post(url, {
                        jobDescriptionHtml: getters.getCurrentJob.jobDescriptionHtml,
                    }).then(() => {
                        state.repostingSteps.fillIn_description = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_description = "failed";
                        state.failureMsgs.fillIn_description = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_hiresNumber({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_hiresNumber = "doing";
                state.failureMsgs.fillIn_hiresNumber = null;
                let url = state.BASE_URL + "/jobs/fillIn_hiresNumber";
                axios
                    .post(url, {
                        jobDetails_intHiresNeeded: getters.getCurrentJob.jobDetails_intHiresNeeded,
                    })
                    .then(() => {
                        state.repostingSteps.fillIn_hiresNumber = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_hiresNumber = "failed";
                        state.failureMsgs.fillIn_hiresNumber = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_fillIn_isJobFullTimeOrPartTime({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "doing";
                state.failureMsgs.fillIn_isJobFullTimeOrPartTime = null;
                let url = state.BASE_URL + "/jobs/fillIn_isJobFullTimeOrPartTime";
                axios
                    .post(url, {
                        jobDetails_WhatTypeOfJobIsIt: getters.getCurrentJob
                            .jobDetails_WhatTypeOfJobIsIt,
                    }).then(() => {
                        state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "failed";
                        state.failureMsgs.fillIn_isJobFullTimeOrPartTime = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_fillIn_isResumeRequired({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_isResumeRequired = "doing";
                state.failureMsgs.fillIn_isResumeRequired = null;
                let url = state.BASE_URL + "/jobs/fillIn_isResumeRequired";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.fillIn_isResumeRequired = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_isResumeRequired = "failed";
                        state.failureMsgs.fillIn_isResumeRequired = error.response.data.error;
                        console.log(error);
                        rej()
                    });
            })

        },
        execute_fillIn_JobCategory({ state }) {
            return new Promise((res, rej) => {

                state.repostingSteps.fillIn_JobCategory = "doing";
                state.failureMsgs.fillIn_JobCategory = null;
                let url = state.BASE_URL + "/jobs/fillIn_JobCategory";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.fillIn_JobCategory = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_JobCategory = "failed";
                        state.failureMsgs.fillIn_JobCategory = error.response.data.error;
                        console.log(error);
                        rej();
                    });
            })
        },
        execute_fillIn_JobTitle({ state, getters }) {
            return new Promise((res, rej) => {

                state.repostingSteps.fillIn_JobTitle = "doing";
                state.failureMsgs.fillIn_JobTitle = null;
                let url = state.BASE_URL + "/jobs/fillIn_JobTitle";
                axios
                    .post(url, { jobTitle: getters.getCurrentJob.jobTitle })
                    .then(() => {
                        state.repostingSteps.fillIn_JobTitle = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_JobTitle = "failed";
                        state.failureMsgs.fillIn_JobTitle = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })
        },
        execute_fillIn_paymentFrom({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_paymentFrom = "doing";
                state.failureMsgs.fillIn_paymentFrom = null;
                let url = state.BASE_URL + "/jobs/fillIn_paymentFrom";
                axios
                    .post(url, {
                        jobDetails_SalaryFrom: getters.getCurrentJob
                            .jobDetails_SalaryFrom,
                    }).then(() => {
                        state.repostingSteps.fillIn_paymentFrom = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_paymentFrom = "failed";
                        state.failureMsgs.fillIn_paymentFrom = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_webSite({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_webSite = "doing";
                state.failureMsgs.fillIn_webSite = null;
                let url = state.BASE_URL + "/jobs/fillIn_webSite";
                axios
                    .get(url).then(() => {
                        state.repostingSteps.fillIn_webSite = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_webSite = "failed";
                        state.failureMsgs.fillIn_webSite = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_industry({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_industry = "doing";
                state.failureMsgs.fillIn_industry = null;
                let url = state.BASE_URL + "/jobs/fillIn_industry";
                axios
                    .get(url).then(() => {
                        state.repostingSteps.fillIn_industry = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_industry = "failed";
                        state.failureMsgs.fillIn_industry = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_salaryFromAndTo({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_salaryFromAndTo = "doing";
                state.failureMsgs.fillIn_salaryFromAndTo = null;
                let url = state.BASE_URL + "/jobs/fillIn_salaryFromAndTo";
                axios
                    .post(url, {
                        jobDetails_SalaryFrom: getters.getCurrentJob
                            .jobDetails_SalaryFrom,
                        jobDetails_SalaryTo: getters.getCurrentJob
                            .jobDetails_SalaryTo,
                        jobDetails_salaryRangeType: getters.getCurrentJob
                            .jobDetails_salaryRangeType,
                    }).then(() => {
                        state.repostingSteps.fillIn_salaryFromAndTo = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_salaryFromAndTo = "failed";
                        state.failureMsgs.fillIn_salaryFromAndTo = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_paymentPer({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_paymentPer = "doing";
                state.failureMsgs.fillIn_paymentPer = null;
                let url = state.BASE_URL + "/jobs/fillIn_paymentPer";
                axios
                    .post(url, {
                        jobDetails_SalaryPer: getters.getCurrentJob
                            .jobDetails_SalaryPer,
                    }).then(() => {
                        state.repostingSteps.fillIn_paymentPer = "done";
                        res()
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_paymentPer = "failed";
                        state.failureMsgs.fillIn_paymentPer = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_paymentTo({ state, getters }) {
            return new Promise((res, rej) => {
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
                        res();

                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_paymentTo = "failed";
                        state.failureMsgs.fillIn_paymentTo = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_fillIn_paymentType({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_paymentType = "doing";
                state.failureMsgs.fillIn_paymentType = null;
                let url = state.BASE_URL + "/jobs/fillIn_paymentType";
                axios
                    .post(url, {
                        jobDetails_salaryRangeType: getters.getCurrentJob
                            .jobDetails_salaryRangeType,
                    }).then(() => {
                        state.repostingSteps.fillIn_paymentType = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_paymentType = "failed";
                        state.failureMsgs.fillIn_paymentType = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_fillIn_RolesLocation({ state, getters }) {
            return new Promise((res, rej) => {
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
                        res();
                        state.repostingSteps.fillIn_RolesLocation = "done";
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_RolesLocation = "failed";
                        state.failureMsgs.fillIn_RolesLocation = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })
        },
        execute_fillIn_schedule({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_schedule = "doing";
                state.failureMsgs.fillIn_schedule = null;
                let url = state.BASE_URL + "/jobs/fillIn_schedule";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.fillIn_schedule = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_schedule = "failed";
                        state.failureMsgs.fillIn_schedule = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_getJobFullDetails({ state, getters, commit }) {
            return new Promise((response, reject) => {
                state.repostingSteps.getJobFullDetails = "doing";
                state.failureMsgs.getJobFullDetails = null;
                let url = state.BASE_URL + "/jobs/getJobFullDetails";
                axios
                    .post(url, { job_id: getters.getCurrentJob.job_id })
                    .then((res) => {
                        state.repostingSteps.getJobFullDetails = "done";
                        //affect the full details to the current job
                        commit("setCurrentJob", res.data.job);
                        response();

                    })
                    .catch((error) => {
                        state.repostingSteps.getJobFullDetails = "failed";
                        state.failureMsgs.getJobFullDetails = error.response.data.error;
                        console.log(error);
                        reject(error)
                    });
            })
        },
        execute_openPostJobPage({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.openPostJobPage = "doing";
                state.failureMsgs.openPostJobPage = null;
                let url = state.BASE_URL + "/jobs/openPostJobPage";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.openPostJobPage = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.openPostJobPage = "failed";
                        state.failureMsgs.openPostJobPage = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })
        },
        execute_unlockCompanyNameInput({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.unlockCompanyNameInput = "doing";
                state.failureMsgs.unlockCompanyNameInput = null;
                let url = state.BASE_URL + "/jobs/unlockCompanyNameInput";
                axios
                    .get(url)
                    .then(() => {
                        state.repostingSteps.unlockCompanyNameInput = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.unlockCompanyNameInput = "failed";
                        state.failureMsgs.unlockCompanyNameInput = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })

        },
        execute_fillIn_email({ state, getters }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_email = "doing";
                state.failureMsgs.fillIn_email = null;
                let url = state.BASE_URL + "/jobs/fillIn_email";
                axios
                    .post(url, {
                        jobDetails_emails: getters.getCurrentJob
                            .jobDetails_emails[0],
                    }).then(() => {
                        state.repostingSteps.fillIn_email = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_email = "failed";
                        state.failureMsgs.fillIn_email = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })

        },
        execute_close_questions({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.close_questions = "doing";
                state.failureMsgs.close_questions = null;
                let url = state.BASE_URL + "/jobs/close_questions";
                axios
                    .get(url).then(() => {
                        state.repostingSteps.close_questions = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.close_questions = "failed";
                        state.failureMsgs.close_questions = error.response.data.error;
                        console.log(error);
                        rej(error)
                    });
            })
        },
        execute_fillIn_isJobRemote({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_isJobRemote = "doing";
                state.failureMsgs.fillIn_isJobRemote = null;
                let url = state.BASE_URL + "/jobs/fillIn_isJobRemote";
                axios
                    .get(url).then(() => {
                        state.repostingSteps.fillIn_isJobRemote = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_isJobRemote = "failed";
                        state.failureMsgs.fillIn_isJobRemote = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })
        },
        execute_fillIn_otherBenefits({ state }) {
            return new Promise((res, rej) => {
                state.repostingSteps.fillIn_otherBenefits = "doing";
                state.failureMsgs.fillIn_otherBenefits = null;
                let url = state.BASE_URL + "/jobs/fillIn_otherBenefits";
                axios
                    .get(url).then(() => {
                        state.repostingSteps.fillIn_otherBenefits = "done";
                        res();
                    })
                    .catch((error) => {
                        state.repostingSteps.fillIn_otherBenefits = "failed";
                        state.failureMsgs.fillIn_otherBenefits = error.response.data.error;
                        console.log(error);
                        rej(error);
                    });
            })
        },
    },
    modules: {}
})