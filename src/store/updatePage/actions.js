import axios from 'axios'


export const actions = {
    async startUpdatingSelectedJobs({ state, getters }) {
        //prepare update data
        let updateData = {
            //general info
            'jobTitle': state.getJobTitle,
            'location': state.getLocation,
            //description
            'description': state.getDescription,
            //budget info
            'budget': state.getBudget,
            'maxCPC': state.getMaxCPC,
            'budgetEndDate': state.getBudgetEndDate,
        };
        for (const currentJob of getters.getSelectedJobs) {
            currentJob.updateStatus = "under-processing";
            let url = state.BASE_URL + "/updateJob";
            await new Promise((res, rej) => {
                axios
                    .post(url, {
                        'jobsToUpdate': currentJob,
                        'updateData': updateData,
                    })
                    .then(() => {
                        state.repostingSteps.CloseJob = "done";
                        currentJob.updateStatus = "done";
                        res();
                    })
                    .catch((error) => {
                        currentJob.updateStatus = "failed";
                        currentJob.failureMsg = error.response.data.error;
                        console.log(error);
                        rej(error.response.data.error)
                    });
            })

        }

    },
};