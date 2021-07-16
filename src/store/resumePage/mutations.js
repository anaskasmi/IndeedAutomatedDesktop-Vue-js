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
        } else {
            state.selectedJobs = [];
        }
        state.isAllSelected = newVal;

    },
    setIsAllSelectedForFilteredJobs(state, data) {
        console.log(data.newVal, data.filteredList)
        if (data.newVal == true) {
            state.selectedJobs = data.filteredList;
        } else {
            state.selectedJobs = [];
        }
        state.isAllSelected = data.newVal;
    },
    initRegrabingJobsObject(state) {
        state.regrabingJobsObj.status = null;
        state.regrabingJobsObj.message = null;
    },

};