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
        openPostJobPage: 'notDone',
        unlockCompanyNameInput: 'notDone',
        fillIn_CompanyName: 'notDone',
        fillIn_benefits: 'notDone',
        fillIn_JobTitle: 'notDone',
        fillIn_location: 'notDone',
        clickSaveAndContinue: 'notDone',
        fillIn_isJobFullTimeOrPartTime: 'notDone',
        fillIn_schedule: 'notDone',
        fillIn_hiresNumber: 'notDone',
        fillIn_deadline: 'notDone',
        fillIn_description: 'notDone',
        fillIn_isResumeRequired: 'notDone',
        click_confirm: 'notDone',
        click_skip: 'notDone',
        click_advanced: 'notDone',
        fillIn_adDurationType: 'notDone',
        fillIn_adDurationDate: 'notDone',
        fillIn_CPC: 'notDone',
        fillIn_adBudget: 'notDone',
        fillIn_salary: 'notDone',
        CloseJob: 'notDone',
        fillIn_email: 'notDone',
        close_questions: 'notDone',
        RepostNextJobComponent: 'notDone',
        review_potential_matches: 'notDone',
        skip_qualifications: 'notDone',

    },
    failureMsgs: {
        openPostJobPage: null,
        unlockCompanyNameInput: null,
        fillIn_CompanyName: null,
        fillIn_benefits: null,
        fillIn_JobTitle: null,
        fillIn_location: null,
        clickSaveAndContinue: null,
        fillIn_isJobFullTimeOrPartTime: null,
        fillIn_schedule: null,
        fillIn_hiresNumber: null,
        fillIn_deadline: null,
        fillIn_description: null,
        fillIn_isResumeRequired: null,
        click_confirm: null,
        click_skip: null,
        click_advanced: null,
        fillIn_adDurationType: null,
        fillIn_adDurationDate: null,
        fillIn_CPC: null,
        fillIn_adBudget: null,
        CloseJob: null,
        fillIn_email: null,
        close_questions: null,
        RepostNextJobComponent: null,
        review_potential_matches: null,
        skip_qualifications: null,
        fillIn_salary: null,


    },
};