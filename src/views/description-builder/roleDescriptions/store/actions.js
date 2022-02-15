import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchRoleDescriptions(context) {
        const response = await ApiService.get('/description-builder/roleDescriptions');
        const roleDescriptions = response.data.data;
        context.commit('roleDescriptions', roleDescriptions)
    },
    async createRoleDescription(context, roleDescription) {
        await ApiService.post(`description-builder/roleDescriptions`, roleDescription);
        context.dispatch('fetchRoleDescriptions');
    },
    async updateRoleDescription(context, roleDescription) {
        await ApiService.patch(`description-builder/roleDescriptions/${roleDescription._id}`, roleDescription);
        context.dispatch('fetchRoleDescriptions');
    },
    async deleteRoleDescription(context, id) {
        await ApiService.delete(`description-builder/roleDescriptions/${id}`);
        context.dispatch('fetchRoleDescriptions');
    },
}