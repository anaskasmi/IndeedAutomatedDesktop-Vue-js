export const state = {
    BASE_URL: 'http://localhost:3009/api',
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