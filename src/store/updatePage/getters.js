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
    getRegrabingJobsObj: (state) => {
        return state.regrabingJobsObj;
    },
    getIsUpdateFinished: (state) => {
        for (const job of state.jobsProgress) {
            if (
                job.updateStatus == 'not-done' ||
                job.updateStatus == 'under-processing'
            ) {
                return false;
            }
        }
        return true;
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

    getUpdateData: (state) => {
        return {
            //general info
            'jobTitle': state.jobTitle || null,
            'location': {
                'city': state.locationCity || null,
                'state': state.locationState || null
            },
            //description
            'description': state.description || null,
            //budget info
            'budget': state.budget || null,
            'maxCPC': state.maxCPC || null,
            'budgetEndDate': state.budgetEndDate || null,
        }
    }
};