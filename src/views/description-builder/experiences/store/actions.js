import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchExperiencesItems(context) {
        const response = await ApiService.get('/description-builder/experiences/items');
        const items = response.data.data;
        context.commit('items', items)
    },
    async createExperienceItem(context, item) {
        await ApiService.post(`description-builder/experiences/items`, item);
        context.dispatch('fetchExperiencesItems');
    },
    async updateExperienceItem(context, item) {
        await ApiService.patch(`description-builder/experiences/items/${item._id}`, { name: item.name });
        context.dispatch('fetchExperiencesItems');
    },
    async deleteExperienceItem(context, id) {
        await ApiService.delete(`description-builder/experiences/items/${id}`);
        context.dispatch('fetchExperiencesItems');
    },
    // sets
    async fetchSets(context) {
        const response = await ApiService.get('/description-builder/experiences/sets');
        const sets = response.data.data;
        context.commit('sets', sets)
    },
    async createSets(context, set) {
        await ApiService.post(`description-builder/experiences/sets`, set);
        context.dispatch('fetchSets');
    },
    async updateSet(context, set) {
        await ApiService.patch(`description-builder/experiences/sets/${set._id}`, set);
        context.dispatch('fetchSets');
    },
    async deleteSet(context, id) {
        await ApiService.delete(`description-builder/experiences/sets/${id}`);
        context.dispatch('fetchSets');
    }

}