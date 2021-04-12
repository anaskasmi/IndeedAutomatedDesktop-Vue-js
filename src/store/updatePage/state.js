export const state = {
    BASE_URL: 'http://localhost:3009/api',
    jobs: [],
    selectedJobs: [],
    currentJob: null,
    isAllSelected: false,
    updatingSteps: {},
    failureMsgs: {},
    // update form
    jobTitle: null,
    location: null,
    description: null,
    budget: null,
    maxCPC: null,
    budgetEndDate: null,
};