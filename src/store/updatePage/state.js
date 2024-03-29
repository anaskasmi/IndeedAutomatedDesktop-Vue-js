export const state = {
    BASE_URL: 'http://127.0.0.1:3009/api',
    jobs: [],
    selectedJobs: [],
    currentJob: null,
    isAllSelected: false,
    fetchJobsStatus: {
        failed: false,
        isLoading: false,
        failureMsg: null,
    },
    updatingSteps: {},
    regrabingJobsObj: {
        status: null,
        message: null,
    },
    failureMsgs: {},
    isProgressDialogShowing: false,
    // update form
    jobTitle: null,
    locationCity: null,
    locationState: null,
    description: null,
    budget: null,
    maxCPC: null,
    budgetEndDate: null,
    //update status
    jobsProgress: [],
};