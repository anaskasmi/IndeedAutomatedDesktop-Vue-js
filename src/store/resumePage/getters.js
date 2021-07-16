export const getters = {
    getJobs: (state) => {
        return state.jobs;
    },
    getSelectedJobs: (state) => {
        return state.selectedJobs;
    },

    getRegrabingJobsObj: (state) => {
        return state.regrabingJobsObj;
    },
    getIsAllSelected: (state) => {
        return state.isAllSelected;
    },
    getFetchJobsStatus: (state) => {
        return state.fetchJobsStatus;
    },

};