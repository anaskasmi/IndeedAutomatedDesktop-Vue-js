import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchApplyMethodsItems(context) {
        const response = await ApiService.get('/description-builder/applyMethods/items');
        const items = response.data.data;
        context.commit('items', items)
    },
    async createApplyMethodItem(context, item) {
        await ApiService.post(`description-builder/applyMethods/items`, item);
        context.dispatch('fetchApplyMethodsItems');
    },
    async updateApplyMethodItem(context, item) {
        await ApiService.patch(`description-builder/applyMethods/items/${item._id}`, { name: item.name });
        context.dispatch('fetchApplyMethodsItems');
    },
    async deleteApplyMethodItem(context, id) {
        await ApiService.delete(`description-builder/applyMethods/items/${id}`);
        context.dispatch('fetchApplyMethodsItems');
    },
    // sets
    async fetchSets(context) {
        const response = await ApiService.get('/description-builder/applyMethods/sets');
        const sets = response.data.data;
        await context.commit('sets', sets)
    },
    async createSet(context, set) {
        await ApiService.post(`description-builder/applyMethods/sets`, set);
        await context.dispatch('fetchSets');
    },
    async updateSet(context, set) {
        await ApiService.patch(`description-builder/applyMethods/sets/${set._id}`, set);
        await context.dispatch('fetchSets');
    },
    async deleteSet(context, id) {
        await ApiService.delete(`description-builder/applyMethods/sets/${id}`);
        await context.dispatch('fetchSets');
    },
    async deleteItemFromSet(context, data) {
        await ApiService.post(`description-builder/applyMethods/sets/remove-item/${data.setId}`, {
            "applyMethod": data.itemId
        });
        await context.dispatch('fetchSets');
    }

}