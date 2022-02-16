import axios from 'axios'



export const actions = {
    async startUpdatingSelectedJobs({ dispatch, getters, commit }) {
        //set jobs under processing to true 
        commit('setIsProgressDialogShowing', true)
        commit('initJobsProgress')
        for (const currentJob of getters.getSelectedJobs) {
            await dispatch('startUpdatingOneJob', currentJob.job_id);
        }
    },

    async startUpdatingOneJob({ state, getters, commit }, job_id) {
        //prepare update data
        let updateData = getters.getUpdateData;
        updateData.id = job_id;

        await commit('setJobsProgress', { jobId: job_id, status: "under-processing" })
        let url = state.BASE_URL + "/jobs/updateJob";
        return new Promise((res) => {
            axios
                .post(url, updateData)
                .then(async() => {
                    await commit('setJobsProgress', { jobId: job_id, status: "done" })
                    res();
                })
                .catch(async(error) => {
                    let failureMsg;
                    if (error.response && error.response.data && error.response.data.error) {
                        failureMsg = error.response.data.error;
                    } else {
                        failureMsg = error;
                    }
                    await commit('setJobsProgress', { jobId: job_id, status: "failed", failureMsg })
                    console.log(error);
                    res();
                });
        });
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
                    commit('initJobsProgress');
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
};