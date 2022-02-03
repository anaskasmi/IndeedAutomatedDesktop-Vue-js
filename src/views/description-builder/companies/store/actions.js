import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchCompanies(context) {
        const response = await ApiService.get('/description-builder/companies');
        const companies = response.data.data;
        context.commit('companies', companies)
    },
    async createCompany(context, company) {
        await ApiService.post(`description-builder/companies`, company);
        context.dispatch('fetchCompanies');
    },
    async updateCompany(context, company) {
        await ApiService.patch(`description-builder/companies/${company._id}`, company);
        context.dispatch('fetchCompanies');
    },
    async deleteCompany(context, id) {
        await ApiService.delete(`description-builder/companies/${id}`);
        context.dispatch('fetchCompanies');
    },
}