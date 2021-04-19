export const getters = {
    getJobs: (state) => {
        return state.jobs;
    },
    getSelectedJobs: (state) => {
        return state.selectedJobs;
    },

    getJobsProgress: (state) => {
        return state.jobsProgress;
    },
    getFetchJobsStatus: (state) => {
        return state.fetchJobsStatus;
    },
    getIsAllSelected: (state) => {
        return state.isAllSelected;
    },
    getIsRepostingPageEnabled: (state) => {
        if (state.selectedJobs && state.selectedJobs.length) {
            return true;
        } else {
            return false;
        }
    },
    getIsProgressDialogShowing: (state) => {
        return state.isProgressDialogShowing;
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
    getLocationCity: (state) => {
        return state.locationCity;
    },
    getLocationState: (state) => {
        return state.locationState;
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