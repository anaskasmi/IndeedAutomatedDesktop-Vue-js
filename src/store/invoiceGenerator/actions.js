import axios from 'axios'

export const actions = {
    async generateInvoice(context) {
        return new Promise((resolve, reject) => {
            let url = context.state.BASE_URL + "/jobs/invoiceGenerator";
            axios.post(url, {
                dates: context.state.selectedDates,
                jobsNumbers: context.state.jobsNumbers
            }).then((res) => {
                console.log(res);
                var FILE = window.URL.createObjectURL(new Blob([res.data]));

                var docUrl = document.createElement('x');
                docUrl.href = FILE;
                docUrl.setAttribute('download', 'invoice.xlsx');
                document.body.appendChild(docUrl);
                docUrl.click();

                resolve(res);
            }).catch((error) => {
                console.log(error);
                reject(error)
            });

        });
    },


};