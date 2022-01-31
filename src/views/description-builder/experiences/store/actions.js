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
        await context.commit('sets', sets)
    },
    async createSet(context, set) {
        await ApiService.post(`description-builder/experiences/sets`, set);
        await context.dispatch('fetchSets');
    },
    async updateSet(context, set) {
        await ApiService.patch(`description-builder/experiences/sets/${set._id}`, set);
        await context.dispatch('fetchSets');
    },
    async deleteSet(context, id) {
        await ApiService.delete(`description-builder/experiences/sets/${id}`);
        await context.dispatch('fetchSets');
    },
    async deleteItemFromSet(context, data) {
        await ApiService.post(`description-builder/experiences/sets/remove-item/${data.setId}`, {
            "experience": data.itemId
        });
        await context.dispatch('fetchSets');
    }

}