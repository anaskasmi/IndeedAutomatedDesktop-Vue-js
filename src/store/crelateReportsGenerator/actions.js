import axios from 'axios'

export const actions = {
    async generateReport(context) {
        return new Promise((resolve, reject) => {
            let url = context.state.BASE_URL + "/crelate-reports/generateReports";
            axios.post(url, {
                jobsNumbers: context.state.jobsNumbers
            }).then((res) => {
                resolve(res);
            }).catch((error) => {
                console.log(error);
                reject(error)
            });

        });
    },


};