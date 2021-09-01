export const getters = {
    getJobs: (state) => {
        return state.jobs;
    },
    getEndDateIncreaseNumber: (state) => {

        state.endDateIncreaseNumber = +localStorage.getItem('endDateIncreaseNumber');
        return state.endDateIncreaseNumber || 3;
    },
    getSelectedJobs: (state) => {
        return state.selectedJobs;
    },
    getIsAllSelected: (state) => {
        return state.isAllSelected;
    },
    getFetchJobsStatus: (state) => {
        return state.fetchJobsStatus;
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
        if (state.currentJob && state.currentJob.jobDetails_type) {
            return (state.currentJob.jobDetails_type != null)
        }
        return false;
    }
};