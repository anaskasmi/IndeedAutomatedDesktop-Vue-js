import axios from 'axios'

export const actions = {
    async generateInvoice(context) {
        return new Promise((resolve, reject) => {
            let url = context.state.BASE_URL + "/jobs/invoiceGenerator";
            axios.post(url, {
                dates: context.state.selectedDates,
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