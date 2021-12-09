import axios from 'axios'

export const actions = {
    async generateInvoice(context) {
        return new Promise((resolve, reject) => {
            let url = context.state.BASE_URL + "/invoiceGenerator";
            axios.post(url, {
                dates: context.state.selectedDates,
                jobsNumbers: context.state.selectedDates
            }).then((res) => {
                console.log(res);
                resolve(res);
            }).catch((error) => {
                console.log(error);
                reject(error)
            });

        });
    },


};