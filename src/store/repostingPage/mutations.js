export const mutations = {
    setJobs(state, newVal) {
        state.jobs = newVal;
    },
    setSelectedJobs(state, newVal) {
        state.selectedJobs = newVal;
    },
    setEndDateIncreaseNumber(state, newVal) {
        state.endDateIncreaseNumber = newVal;
        localStorage.setItem("endDateIncreaseNumber", +newVal);
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
            fillIn_salaryFromAndTo: null,
            fillIn_industry: null,
        };
    },


};