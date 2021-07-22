export const state = {
    BASE_URL: 'http://127.0.0.1:3009/api',
    isTransferDialogVisible: false,
    currentJobOpened: null,
    selectedJobs: [],
    fetchJobsStatus: {
        failed: false,
        isLoading: false,
        failureMsg: null,
    },
    regrabingJobsObj: {
        status: null,
        message: null,
    },


};