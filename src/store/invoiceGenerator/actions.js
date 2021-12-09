import axios from 'axios'

export const actions = {
    async generateInvoice({ state, commit }) {
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