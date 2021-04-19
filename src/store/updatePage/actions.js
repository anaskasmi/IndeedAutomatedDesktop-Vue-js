import axios from 'axios'



export const actions = {
    async startUpdatingSelectedJobs({ state, getters, commit }) {
        //set jobs under processing to true 
        commit('setIsProgressDialogShowing', true)
        commit('initJobsProgress')
        for (const currentJob of getters.getSelectedJobs) {
            //prepare update data
            let updateData = {
                //id
                'id': currentJob.job_id,
                //general info
                'jobTitle': getters.getJobTitle || null,
                'location': {
                    'city': getters.getLocationCity || null,
                    'state': getters.getLocationState || null
                },
                //description
                'description': getters.getDescription || null,
                //budget info
                'budget': getters.getBudget || null,
                'maxCPC': getters.getMaxCPC || null,
                'budgetEndDate': getters.getBudgetEndDate || null,
            };


            await commit('setJobsProgress', { jobId: currentJob.job_id, status: "under-processing" })
            let url = state.BASE_URL + "/jobs/updateJob";
            await new Promise((res, rej) => {
                axios
                    .post(url, updateData)
                    .then(async() => {
                        await commit('setJobsProgress', { jobId: currentJob.job_id, status: "done" })
                        res();
                    })
                    .catch(async(error) => {
                        await commit('setJobsProgress', { jobId: currentJob.job_id, status: "failed" })
                        currentJob.failureMsg = error;
                        console.log(error);
                        rej(error)
                    });
            });
        }
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
};