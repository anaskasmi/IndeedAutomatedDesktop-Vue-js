export const mutations = {
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


    startUpdatingTheNextJob(state) {
        //remove job 0 from selected jobs
        state.selectedJobs.shift();
        state.currentJob = state.selectedJobs[0];
        //reset steps
        state.repostingSteps = {

        };

        //reset feilure messages
        state.failureMsgs = {

        };
    },

    setJobTitle: (state, newVal) => {
        state.jobTitle = newVal;
    },
    setLocation: (state, newVal) => {
        state.location = newVal;
    },
    setDescription: (state, newVal) => {
        state.description = newVal;
    },
    setBudget: (state, newVal) => {
        state.budget = newVal;
    },
    setMaxCPC: (state, newVal) => {
        state.maxCPC = newVal;
    },
    setBudgetEndDate: (state, newVal) => {
        state.budgetEndDate = newVal;
    },

};