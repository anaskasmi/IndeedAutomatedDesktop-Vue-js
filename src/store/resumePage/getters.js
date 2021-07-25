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
    getIsGettingJobEmail: (state) => {
        return state.isGettingJobEmail;
    },
    getIsGettingJobsCandidates: (state) => {
        return state.isGettingJobsCandidates;
    },
    getCandidateIdUnderTransfer: (state) => {
        return state.candidateIdUnderTransfer;
    },
    getIsAllResumesUnderTransfer: (state) => {
        return state.isAllResumesUnderTransfer;
    },
    getIsAllSelected: (state) => {
        return state.isAllSelected;
    },
    getFetchJobsStatus: (state) => {
        return state.fetchJobsStatus;
    },
    getIsTransferDialogVisible: (state) => {
        return state.isTransferDialogVisible;
    },
    getCurrentJobOpened: (state) => {
        return state.currentJobOpened;
    },

};