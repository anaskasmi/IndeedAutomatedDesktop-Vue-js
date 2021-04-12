export const getters = {
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
    getUpdatingSteps: (state) => {
        return state.updatingSteps;
    },
    getFailureMsgs: (state) => {
        return state.failureMsgs;
    },
    doesJobHasFullDetails: (state) => {
        return (state.currentJob.jobDetails_type != null)
    },
    getJobTitle: (state) => {
        return state.jobTitle;
    },
    getLocation: (state) => {
        return state.location;
    },
    getDescription: (state) => {
        return state.description;
    },
    getBudget: (state) => {
        return state.budget;
    },
    getMaxCPC: (state) => {
        return state.maxCPC;
    },
    getBudgetEndDate: (state) => {
        return state.budgetEndDate;
    },
};