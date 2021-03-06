export const state = {
    BASE_URL: 'http://127.0.0.1:3009/api',

    jobs: [],
    selectedJobs: [],
    currentJob: null,
    isAllSelected: false,
    autoPilotMode: true,
    fetchJobsStatus: {
        failed: false,
        isLoading: false,
        failureMsg: null,
    },
    repostingSteps: {
        getJobFullDetails: 'notDone',
        openPostJobPage: 'notDone',
        unlockCompanyNameInput: 'notDone',
        fillIn_CompanyName: 'notDone',
        fillIn_JobTitle: 'notDone',
        fillIn_JobCategory: 'notDone',
        fillIn_RolesLocation: 'notDone',
        fillIn_IsJobremote: 'notDone',
        clickSaveAndContinue: 'notDone',
        fillIn_isJobFullTimeOrPartTime: 'notDone',
        fillIn_schedule: 'notDone',
        fillIn_hiresNumber: 'notDone',
        fillIn_deadline: 'notDone',
        fillIn_paymentType: 'notDone',
        fillIn_paymentFrom: 'notDone',
        fillIn_paymentTo: 'notDone',
        fillIn_paymentPer: 'notDone',
        fillIn_description: 'notDone',
        fillIn_isResumeRequired: 'notDone',
        click_confirm: 'notDone',
        click_advanced: 'notDone',
        click_skip: 'notDone',
        fillIn_adDurationType: 'notDone',
        fillIn_adDurationDate: 'notDone',
        fillIn_CPC: 'notDone',
        fillIn_adBudget: 'notDone',
        CloseJob: 'notDone',
        fillIn_email: 'notDone',
        close_questions: 'notDone',
        fillIn_isJobRemote: 'notDone',
        fillIn_otherBenefits: 'notDone',
        RepostNextJobComponent: 'notDone',
        fillIn_salaryFromAndTo: 'notDone',
        fillIn_industry: 'notDone',
    },
    failureMsgs: {
        getJobFullDetails: null,
        openPostJobPage: null,
        unlockCompanyNameInput: null,
        fillIn_CompanyName: null,
        fillIn_JobTitle: null,
        fillIn_JobCategory: null,
        fillIn_RolesLocation: null,
        fillIn_IsJobremote: null,
        clickSaveAndContinue: null,
        fillIn_isJobFullTimeOrPartTime: null,
        fillIn_schedule: null,
        fillIn_hiresNumber: null,
        fillIn_deadline: null,
        fillIn_paymentType: null,
        fillIn_paymentFrom: null,
        fillIn_paymentTo: null,
        fillIn_paymentPer: null,
        fillIn_description: null,
        fillIn_isResumeRequired: null,
        click_confirm: null,
        click_advanced: null,
        click_skip: null,
        fillIn_adDurationType: null,
        fillIn_adDurationDate: null,
        fillIn_CPC: null,
        fillIn_adBudget: null,
        CloseJob: null,
        fillIn_email: null,
        close_questions: null,
        fillIn_isJobRemote: null,
        fillIn_otherBenefits: null,
        RepostNextJobComponent: null,
        fillIn_salaryFromAndTo: null,
        fillIn_industry: null,

    },
};