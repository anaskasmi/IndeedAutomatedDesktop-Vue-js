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
    getRepostingSteps: (state) => {
        return state.repostingSteps;
    },
    getFailureMsgs: (state) => {
        return state.failureMsgs;
    },
    doesJobHasFullDetails: (state) => {
        return (state.currentJob.jobDetails_type != null)
    }
};