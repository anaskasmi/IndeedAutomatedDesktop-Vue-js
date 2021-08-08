import axios from 'axios'

export const actions = {
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
                if (dateOfJob1 >= dateOfJob2) {
                    return 1;
                } else {
                    return -1;
                }
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

    async reGrabJobsFromIndeed({ state, commit }) {
        let url = state.BASE_URL + "/jobs/scrapAllJobs";
        state.regrabingJobsObj.status = 'under-processing';
        state.regrabingJobsObj.message = 'please wait a second we are grabing the jobs from Indeed for you !';
        return new Promise((res) => {
            axios
                .get(url)
                .then((response) => {
                    state.jobs = response.data.jobs;
                    state.regrabingJobsObj.message = 'Jobs regrabed successfully !';
                    state.regrabingJobsObj.status = 'done';
                    commit('setSelectedJobs', []);
                    res();
                })
                .catch((error) => {
                    state.regrabingJobsObj.status = 'failed';
                    if (error.response && error.response.data.error) {
                        state.regrabingJobsObj.message = error.response.data.error;
                        console.log(error.response.data.error);
                    } else {
                        state.regrabingJobsObj.message = error;
                        console.log(error);
                    }
                    res();
                });
        });

    },

    async getJobEmailForCurrentJobOpened({ state, dispatch }) {
        let url = state.BASE_URL + "/jobs/getJobEmail";
        return new Promise((resolve, reject) => {
            axios
                .post(url, { jobId: state.currentJobOpened.job_id })
                .then(async() => {
                    await dispatch('reFetchCurrentJobOpened');
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async transferAllResumesForOneJob({ state, dispatch }) {
        let url = state.BASE_URL + "/jobs/transferAllResumesForOneJob";
        return new Promise((resolve, reject) => {
            axios
                .post(url, { jobId: state.currentJobOpened.job_id })
                .then(async() => {
                    await dispatch('reFetchCurrentJobOpened');
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async getCandidatesDetailsForCurrentJobOpened({ state, dispatch }) {
        let url = state.BASE_URL + "/jobs/getCandidatesDetails";
        return new Promise((resolve, reject) => {
            axios
                .post(url, { jobId: state.currentJobOpened.job_id })
                .then(async() => {
                    await dispatch('reFetchCurrentJobOpened');
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    async transferResumeOfOneCandidate({ state, dispatch }, candidateId) {
        let url = state.BASE_URL + "/jobs/transferResumeOfOneCandidate";
        return new Promise((resolve, reject) => {
            axios
                .post(url, { jobId: state.currentJobOpened.job_id, candidateId })
                .then(async() => {
                    await dispatch('reFetchCurrentJobOpened');
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    async transferResumesOfCandidatesList({ state, }, candidatesList) {
        console.log(candidatesList);
        let url = state.BASE_URL + "/jobs/transferResumesOfCandidatesList";
        return new Promise((resolve, reject) => {
            axios
                .post(url, { candidatesList: candidatesList })
                .then(async() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    async getCandidatesBetweenTwoDates({ state, commit }, dates) {
        let url = state.BASE_URL + "/jobs/getCandidatesBetweenTwoDates";
        return new Promise((resolve, reject) => {
            axios
                .post(url, { "startDate": dates.startDate, "endDate": dates.endDate })
                .then(async(res) => {
                    commit('setCandidatesBetweenTwoDates', res.data.candidates);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async reFetchCurrentJobOpened({ state, commit }) {
        let url = state.BASE_URL + "/jobs/getJobDataFromDb/" + state.currentJobOpened.job_id;
        return new Promise((resolve) => {
            axios
                .get(url, )
                .then((response) => {
                    commit('setCurrentJobOpened', response.data.job)
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    if (error.response && error.response.data.error) {
                        state.regrabingJobsObj.message = error.response.data.error;
                        console.log(error.response.data.error);
                    } else {
                        state.regrabingJobsObj.message = error;
                        console.log(error);
                    }
                    resolve();
                });
        });
    },

};