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

    async transferJobsResume({ state }, jobId) {
        let url = state.BASE_URL + "/jobs/downloadResumesForOneJob";
        return new Promise((res) => {
            axios
                .post(url, { jobId })
                .then((response) => {
                    console.log(response);
                    res();
                })
                .catch((error) => {
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


};