import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        BASE_URL: 'http://localhost:3000/api',
        jobs: [],
        selectedJobs: [],
        isAllSelected: false,
        autoPilotMode: true,
        repostingSteps: {
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
                return state.selectedJobs[0];
            } else {
                return null
            }

        },
        getQueueLength: (state) => {
            return state.selectedJobs.length;
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
        },
        unQueueJob(state) {
            let shiftedId = state.selectedJobsIds.shift();
            state.currentJobBeingReposted = state.jobsList.find((job) => {
                if (job.job_id == shiftedId) {
                    return true;
                }
            });

            state.repostingSteps = {
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
            }
        },

        repostJobsInQueue(state) {
            let someThingFailed = false;
            while (state.jobsToRepostQueue.length > 0 && someThingFailed == false) {
                state.currentJobBeingReposted = state.jobsToRepostQueue.shift();
                //refresh reposting steps 
                state.repostingSteps = {
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
                };

                //openPostJobPage
                state.repostingSteps.openPostJobPage = 'doing';
                this.$axios.get(state.BASE_URL + '/openPostJobPage').then(() => {
                    state.repostingSteps.openPostJobPage = "done";

                }).catch(() => {
                    state.repostingSteps.openPostJobPage = "failed";
                    someThingFailed = true;
                    return;
                });
                //unlockCompanyNameInput
                state.repostingSteps.unlockCompanyNameInput = 'doing';
                this.$axios.get(state.BASE_URL + '/unlockCompanyNameInput').then(() => {
                    state.repostingSteps.unlockCompanyNameInput = "done";

                }).catch(() => {
                    state.repostingSteps.unlockCompanyNameInput = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_CompanyName
                state.repostingSteps.fillIn_CompanyName = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_CompanyName').then(() => {
                    state.repostingSteps.fillIn_CompanyName = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_CompanyName = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_JobTitle
                state.repostingSteps.fillIn_JobTitle = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_JobTitle').then(() => {
                    state.repostingSteps.fillIn_JobTitle = "done";

                }).catch(() => {
                    state.repostingSteps.temprary = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_JobCategory
                state.repostingSteps.fillIn_JobCategory = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_JobCategory').then(() => {
                    state.repostingSteps.fillIn_JobCategory = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_JobCategory = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_RolesLocation
                state.repostingSteps.fillIn_RolesLocation = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_RolesLocation').then(() => {
                    state.repostingSteps.fillIn_RolesLocation = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_RolesLocation = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_IsJobremote
                state.repostingSteps.fillIn_IsJobremote = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_IsJobremote').then(() => {
                    state.repostingSteps.fillIn_IsJobremote = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_IsJobremote = "failed";
                    someThingFailed = true;
                    return;
                });
                //clickSaveAndContinue
                state.repostingSteps.clickSaveAndContinue = 'doing';
                this.$axios.get(state.BASE_URL + '/clickSaveAndContinue').then(() => {
                    state.repostingSteps.clickSaveAndContinue = "done";

                }).catch(() => {
                    state.repostingSteps.clickSaveAndContinue = "failed";
                    someThingFailed = true;
                    return;
                });
                //clickSaveAndContinue
                state.repostingSteps.temprary = 'doing';
                this.$axios.get(state.BASE_URL + '/temprary').then(() => {
                    state.repostingSteps.temprary = "done";

                }).catch(() => {
                    state.repostingSteps.temprary = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_isJobFullTimeOrPartTime
                state.repostingSteps.fillIn_isJobFullTimeOrPartTime = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_isJobFullTimeOrPartTime').then(() => {
                    state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_schedule
                state.repostingSteps.fillIn_schedule = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_schedule').then(() => {
                    state.repostingSteps.fillIn_schedule = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_schedule = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_hiresNumber
                state.repostingSteps.fillIn_hiresNumber = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_hiresNumber').then(() => {
                    state.repostingSteps.fillIn_hiresNumber = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_hiresNumber = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_deadline
                state.repostingSteps.fillIn_deadline = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_deadline').then(() => {
                    state.repostingSteps.fillIn_deadline = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_deadline = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_paymentType
                state.repostingSteps.fillIn_paymentType = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_paymentType').then(() => {
                    state.repostingSteps.fillIn_paymentType = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_paymentType = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_paymentFrom
                state.repostingSteps.fillIn_paymentFrom = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_paymentFrom').then(() => {
                    state.repostingSteps.fillIn_paymentFrom = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_paymentFrom = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_paymentTo
                state.repostingSteps.fillIn_description = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_description').then(() => {
                    state.repostingSteps.fillIn_description = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_description = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_paymentPer
                state.repostingSteps.fillIn_paymentPer = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_paymentPer').then(() => {
                    state.repostingSteps.fillIn_paymentPer = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_paymentPer = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_isResumeRequired
                state.repostingSteps.fillIn_isResumeRequired = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_isResumeRequired').then(() => {
                    state.repostingSteps.fillIn_isResumeRequired = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_isResumeRequired = "failed";
                    someThingFailed = true;
                    return;
                });
                //click_confirm
                state.repostingSteps.click_confirm = 'doing';
                this.$axios.get(state.BASE_URL + '/click_confirm').then(() => {
                    state.repostingSteps.click_confirm = "done";

                }).catch(() => {
                    state.repostingSteps.click_confirm = "failed";
                    someThingFailed = true;
                    return;
                });
                //click_advanced
                state.repostingSteps.click_advanced = 'doing';
                this.$axios.get(state.BASE_URL + '/click_advanced').then(() => {
                    state.repostingSteps.click_advanced = "done";

                }).catch(() => {
                    state.repostingSteps.click_advanced = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_adDurationType
                state.repostingSteps.fillIn_adDurationType = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_adDurationType').then(() => {
                    state.repostingSteps.fillIn_adDurationType = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_adDurationType = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_CPC
                state.repostingSteps.fillIn_CPC = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_CPC').then(() => {
                    state.repostingSteps.fillIn_CPC = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_CPC = "failed";
                    someThingFailed = true;
                    return;
                });
                //fillIn_adBudget
                state.repostingSteps.fillIn_adBudget = 'doing';
                this.$axios.get(state.BASE_URL + '/fillIn_adBudget').then(() => {
                    state.repostingSteps.fillIn_adBudget = "done";

                }).catch(() => {
                    state.repostingSteps.fillIn_adBudget = "failed";
                    someThingFailed = true;
                    return;
                });
                //closeJob
                state.repostingSteps.closeJob = 'doing';
                this.$axios.get(state.BASE_URL + '/closeJob').then(() => {
                    state.repostingSteps.closeJob = "done";

                }).catch(() => {
                    state.repostingSteps.closeJob = "failed";
                    someThingFailed = true;
                    return;
                });

            }

        },
        setCurrentJobBeingReposted(state, job) {
            state.currentJobBeingReposted = job;
        }
    },
    actions: {


    },
    modules: {}
})