import axios from 'axios'


export const actions = {
    async saveCookies({ state }) {
        let url = state.BASE_URL + "/jobs/saveCookies";
        await axios.get(url);
    },
    async fetchJobs({ state, commit }) {
        //init
        state.fetchJobsStatus.failed = false;
        state.fetchJobsStatus.isLoading = true;
        let url = state.BASE_URL + "/jobs/getAllJobsFromDb";
        //get jobs
        try {
            let res = await axios.get(url);
            let jobs = res.data.jobs;
            state.fetchJobsStatus.isLoading = false;
            //sort jobs
            jobs = jobs.sort((job1, job2) => {
                let dateOfJob1 = new Date(job1.dateCreated);
                let dateOfJob2 = new Date(job2.dateCreated);

                // Compare dates
                if (dateOfJob1 > dateOfJob2) {
                    return 1;
                } else if (dateOfJob1 < dateOfJob2) {
                    return -1;
                }

                // Dates are equal, so compare times
                let timeOfJob1 = dateOfJob1.getTime();
                let timeOfJob2 = dateOfJob2.getTime();

                if (timeOfJob1 > timeOfJob2) {
                    return 1;
                } else if (timeOfJob1 < timeOfJob2) {
                    return -1;
                }

                // Times are equal, so jobs are equal
                return 0;
            });
            commit("setJobs", jobs);
            if (!state.selectedJobs.length) {
                commit("setSelectedJobs", []);
            }

        } catch (error) {
            state.fetchJobsStatus.isLoading = false;
            if (error.response && error.response.data.error) {
                state.fetchJobsStatus.failureMsg = error.response.data.error;
            } else {
                state.fetchJobsStatus.failureMsg = error.message;
            }
            state.fetchJobsStatus.failed = true;
        }




    },

    execute_click_confirm({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.click_confirm = "doing";
            state.failureMsgs.click_confirm = null;
            let url = state.BASE_URL + "/jobs/click_confirm";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.click_confirm = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.click_confirm = "failed";
                    state.failureMsgs.click_confirm = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },
    execute_click_skip({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.click_skip = "doing";
            state.failureMsgs.click_skip = null;
            let url = state.BASE_URL + "/jobs/click_skip";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.click_skip = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.click_skip = "failed";
                    state.failureMsgs.click_skip = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },
    execute_skip_preview_page({ state }) {
        return new Promise((res, rej) => {
            let url = state.BASE_URL + "/jobs/skip_preview_page";
            axios
                .get(url)
                .then(() => {
                    res();
                })
                .catch((error) => {
                    console.log(error);
                    rej(error)
                });
        })
    },
    execute_fillIn_CPC({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_CPC = "doing";
            state.failureMsgs.fillIn_CPC = null;
            let url = state.BASE_URL + "/jobs/fillIn_CPC";
            axios
                .post(url, { 'budget_maxCPC': getters.getCurrentJob.budget_maxCPC })
                .then(() => {
                    state.repostingSteps.fillIn_CPC = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_CPC = "failed";
                    state.failureMsgs.fillIn_CPC = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })
    },


    execute_clickSaveAndContinue({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.clickSaveAndContinue = "doing";
            state.failureMsgs.clickSaveAndContinue = null;
            let url = state.BASE_URL + "/jobs/clickSaveAndContinue";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.clickSaveAndContinue = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.clickSaveAndContinue = "failed";
                    state.failureMsgs.clickSaveAndContinue = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })

    },
    execute_CloseJob({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.CloseJob = "doing";
            state.failureMsgs.CloseJob = null;
            let url = state.BASE_URL + "/jobs/CloseJob";
            axios
                .post(url, { 'jobId': getters.getCurrentJob.job_id })
                .then(() => {
                    state.repostingSteps.CloseJob = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.CloseJob = "failed";
                    state.failureMsgs.CloseJob = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })

    },
    execute_fillIn_adBudget({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_adBudget = "doing";
            state.failureMsgs.fillIn_adBudget = null;
            let url = state.BASE_URL + "/jobs/fillIn_adBudget";
            axios
                .post(url, { 'budget_amount': getters.getCurrentJob.budget_amount/100 })
                .then(() => {
                    state.repostingSteps.fillIn_adBudget = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_adBudget = "failed";
                    state.failureMsgs.fillIn_adBudget = error.response.data.error;
                    console.log(error);
                    rej();
                });
        })

    },
    execute_fillIn_adDurationDate({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_adDurationDate = "doing";
            state.failureMsgs.fillIn_adDurationDate = null;
            let url = state.BASE_URL + "/jobs/fillIn_adDurationDate";
            axios
                .post(url)
                .then(() => {
                    state.repostingSteps.fillIn_adDurationDate = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_adDurationDate = "failed";
                    state.failureMsgs.fillIn_adDurationDate = error.response.data.error;
                    console.log(error);
                    rej();
                });
        })

    },
    execute_fillIn_adDurationType({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_adDurationType = "doing";
            state.failureMsgs.fillIn_adDurationType = null;
            let url = state.BASE_URL + "/jobs/fillIn_adDurationType";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.fillIn_adDurationType = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_adDurationType = "failed";
                    state.failureMsgs.fillIn_adDurationType = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })

    },
    execute_fillIn_CompanyName({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_CompanyName = "doing";
            state.failureMsgs.fillIn_CompanyName = null;
            let url = state.BASE_URL + "/jobs/fillIn_CompanyName";
            axios
                .post(url, { companyName: getters.getCurrentJob.companyName })
                .then(() => {
                    state.repostingSteps.fillIn_CompanyName = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_CompanyName = "failed";
                    state.failureMsgs.fillIn_CompanyName = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },
    execute_fillIn_benefits({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_benefits = "doing";
            state.failureMsgs.fillIn_benefits = null;
            let url = state.BASE_URL + "/jobs/fillIn_benefits";
            axios
                .post(url, { benefits: getters.getCurrentJob.benefits })
                .then(() => {
                    state.repostingSteps.fillIn_benefits = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_benefits = "failed";
                    state.failureMsgs.fillIn_benefits = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },
    execute_fillIn_deadline({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_deadline = "doing";
            state.failureMsgs.fillIn_deadline = null;
            let url = state.BASE_URL + "/jobs/fillIn_deadline";
            axios
                .post(url, { 'expectedHireDate': getters.getCurrentJob.expectedHireDate })
                .then(() => {
                    state.repostingSteps.fillIn_deadline = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_deadline = "failed";
                    state.failureMsgs.fillIn_deadline = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })

    },
    execute_fillIn_description({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_description = "doing";
            state.failureMsgs.fillIn_description = null;
            let url = state.BASE_URL + "/jobs/fillIn_description";
            axios
                .post(url, {
                    description: getters.getCurrentJob.description,
                }).then(() => {
                    state.repostingSteps.fillIn_description = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_description = "failed";
                    state.failureMsgs.fillIn_description = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })

    },
    execute_fillIn_hiresNumber({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_hiresNumber = "doing";
            state.failureMsgs.fillIn_hiresNumber = null;
            let url = state.BASE_URL + "/jobs/fillIn_hiresNumber";
            axios
                .post(url, {
                    hiresNeeded: getters.getCurrentJob.hiresNeeded,
                })
                .then(() => {
                    state.repostingSteps.fillIn_hiresNumber = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_hiresNumber = "failed";
                    state.failureMsgs.fillIn_hiresNumber = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },
    execute_fillIn_isJobFullTimeOrPartTime({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "doing";
            state.failureMsgs.fillIn_isJobFullTimeOrPartTime = null;
            let url = state.BASE_URL + "/jobs/fillIn_isJobFullTimeOrPartTime";
            axios
                .post(url, {
                    type: getters.getCurrentJob
                        .type,
                }).then(() => {
                    state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_isJobFullTimeOrPartTime = "failed";
                    state.failureMsgs.fillIn_isJobFullTimeOrPartTime = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },
    execute_fillIn_isResumeRequired({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_isResumeRequired = "doing";
            state.failureMsgs.fillIn_isResumeRequired = null;
            let url = state.BASE_URL + "/jobs/fillIn_isResumeRequired";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.fillIn_isResumeRequired = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_isResumeRequired = "failed";
                    state.failureMsgs.fillIn_isResumeRequired = error.response.data.error;
                    console.log(error);
                    rej()
                });
        })

    },

    execute_fillIn_JobTitle({ state, getters }) {
        return new Promise((res, rej) => {

            state.repostingSteps.fillIn_JobTitle = "doing";
            state.failureMsgs.fillIn_JobTitle = null;
            let url = state.BASE_URL + "/jobs/fillIn_JobTitle";
            axios
                .post(url, { jobTitle: getters.getCurrentJob.jobTitle })
                .then(() => {
                    state.repostingSteps.fillIn_JobTitle = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_JobTitle = "failed";
                    state.failureMsgs.fillIn_JobTitle = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })
    },
    execute_fillIn_salary({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_salary = "doing";
            state.failureMsgs.fillIn_salary = null;
            let url = state.BASE_URL + "/jobs/fillIn_salary";
            axios
                .post(url, {
                    salaryRange: getters.getCurrentJob
                        .salaryRange,
                    minSalary:getters.getCurrentJob
                        .minSalary,
                    maxSalary:getters.getCurrentJob
                        .maxSalary,
                    salaryPeriod:getters.getCurrentJob
                        .salaryPeriod,
                }).then(() => {
                    state.repostingSteps.fillIn_salary = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_salary = "failed";
                    state.failureMsgs.fillIn_salary = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })

    },
    execute_fillIn_location({ state, getters }) {
        return new Promise((res, rej) => {

            state.repostingSteps.fillIn_location = "doing";
            state.failureMsgs.fillIn_location = null;
            let url = state.BASE_URL + "/jobs/fillIn_location";
            axios
                .post(url, { "address": getters.getCurrentJob.address, "location": getters.getCurrentJob.location })
                .then(() => {
                    res();
                    state.repostingSteps.fillIn_location = "done";
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_location = "failed";
                    state.failureMsgs.fillIn_location = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })
    },
    execute_fillIn_schedule({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_schedule = "doing";
            state.failureMsgs.fillIn_schedule = null;
            let url = state.BASE_URL + "/jobs/fillIn_schedule";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.fillIn_schedule = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_schedule = "failed";
                    state.failureMsgs.fillIn_schedule = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },
    execute_openPostJobPage({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.openPostJobPage = "doing";
            state.failureMsgs.openPostJobPage = null;
            let url = state.BASE_URL + "/jobs/openPostJobPage";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.openPostJobPage = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.openPostJobPage = "failed";
                    state.failureMsgs.openPostJobPage = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })
    },
    execute_unlockCompanyNameInput({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.unlockCompanyNameInput = "doing";
            state.failureMsgs.unlockCompanyNameInput = null;
            let url = state.BASE_URL + "/jobs/unlockCompanyNameInput";
            axios
                .get(url)
                .then(() => {
                    state.repostingSteps.unlockCompanyNameInput = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.unlockCompanyNameInput = "failed";
                    state.failureMsgs.unlockCompanyNameInput = error.response.data.error;
                    console.log(error);
                    rej(error);
                });
        })

    },

    execute_fillIn_email({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.fillIn_email = "doing";
            state.failureMsgs.fillIn_email = null;
            let url = state.BASE_URL + "/jobs/fillIn_email";
            axios
                .post(url, {
                    email: getters.getCurrentJob
                        .email,
                }).then(() => {
                    state.repostingSteps.fillIn_email = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.fillIn_email = "failed";
                    state.failureMsgs.fillIn_email = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },

    execute_review_potential_matches({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.review_potential_matches = "doing";
            state.failureMsgs.review_potential_matches = null;
            let url = state.BASE_URL + "/jobs/review_potential_matches";
            axios
                .post(url, {
                    email: getters.getCurrentJob
                        .email,
                }).then(() => {
                    state.repostingSteps.review_potential_matches = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.review_potential_matches = "failed";
                    state.failureMsgs.review_potential_matches = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })

    },

    execute_skip_qualifications({ state, getters }) {
        return new Promise((res, rej) => {
            state.repostingSteps.skip_qualifications = "doing";
            state.failureMsgs.skip_qualifications = null;
            let url = state.BASE_URL + "/jobs/skip_qualifications";
            axios
                .post(url, {
                    email: getters.getCurrentJob
                        .email,
                }).then(() => {
                    state.repostingSteps.skip_qualifications = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.skip_qualifications = "failed";
                    state.failureMsgs.skip_qualifications = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })
    },
    execute_close_questions({ state }) {
        return new Promise((res, rej) => {
            state.repostingSteps.close_questions = "doing";
            state.failureMsgs.close_questions = null;
            let url = state.BASE_URL + "/jobs/close_questions";
            axios
                .get(url).then(() => {
                    state.repostingSteps.close_questions = "done";
                    res();
                })
                .catch((error) => {
                    state.repostingSteps.close_questions = "failed";
                    state.failureMsgs.close_questions = error.response.data.error;
                    console.log(error);
                    rej(error)
                });
        })
    },


};