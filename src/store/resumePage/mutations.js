export const mutations = {
    setJobs(state, newVal) {
        state.jobs = newVal;
    },
    setIsGettingJobEmail(state, newVal) {
        state.isGettingJobEmail = newVal;
    },
    setIsGettingJobsCandidates(state, newVal) {
        state.isGettingJobsCandidates = newVal;
    },
    setCandidateIdUnderTransfer(state, newVal) {
        state.candidateIdUnderTransfer = newVal;
    },
    setIsAllResumesUnderTransfer(state, newVal) {
        state.isAllResumesUnderTransfer = newVal;
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
    setIsTransferDialogVisible(state, newVal) {
        state.isTransferDialogVisible = newVal;
    },
    setIsTransfeResumesByDateDialogVisible(state, newVal) {
        state.isTransfeResumesByDateDialogVisible = newVal;
    },
    setCandidatesBetweenTwoDates(state, newVal) {
        state.candidatesBetweenTwoDates = newVal;
    },
    setCurrentJobOpened(state, newVal) {
        state.currentJobOpened = newVal;
    },

};