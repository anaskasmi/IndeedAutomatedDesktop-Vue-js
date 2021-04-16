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
    setIsProgressDialogShowing: (state, newVal) => {
        state.isProgressDialogShowing = newVal;
    },

    setJobsProgress: (state, newVal) => {
        const { jobId, status } = newVal;
        for (const job of state.jobsProgress) {
            if (job.job_id == jobId) {
                job.updateStatus = status;
            }
        }

    },
    initJobsProgress: (state) => {
        state.jobsProgress = [];
        state.selectedJobs.forEach(job => {

            let jobToAdd = {};
            jobToAdd.jobTitle = job.jobTitle;
            jobToAdd.job_id = job.job_id;
            jobToAdd.updateStatus = 'not-done';

            state.jobsProgress.push(jobToAdd);
        });
    },
    startUpdatingTheNextJob(state) {
        //remove job 0 from selected jobs
        state.selectedJobs.shift();
        state.currentJob = state.selectedJobs[0];
        //reset steps
        state.repostingSteps = {

        };

        //reset failure messages
        state.failureMsgs = {};
    },

    setJobTitle: (state, newVal) => {
        state.jobTitle = newVal;
    },
    setLocationCity: (state, newVal) => {
        state.locationCity = newVal;
    },
    setLocationState: (state, newVal) => {
        state.locationState = newVal;
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