import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchQualitiesItems(context) {
        const response = await ApiService.get('/description-builder/qualities/items');
        const items = response.data.data;
        context.commit('items', items)
    },
    async createQualityItem(context, item) {
        await ApiService.post(`description-builder/qualities/items`, item);
        context.dispatch('fetchQualitiesItems');
    },
    async updateQualityItem(context, item) {
        await ApiService.patch(`description-builder/qualities/items/${item._id}`, { name: item.name });
        context.dispatch('fetchQualitiesItems');
    },
    async deleteQualityItem(context, id) {
        await ApiService.delete(`description-builder/qualities/items/${id}`);
        context.dispatch('fetchQualitiesItems');
    },
    // sets
    async fetchSets(context) {
        const response = await ApiService.get('/description-builder/qualities/sets');
        const sets = response.data.data;
        await context.commit('sets', sets)
    },
    async createSet(context, set) {
        await ApiService.post(`description-builder/qualities/sets`, set);
        await context.dispatch('fetchSets');
    },
    async updateSet(context, set) {
        await ApiService.patch(`description-builder/qualities/sets/${set._id}`, set);
        await context.dispatch('fetchSets');
    },
    async deleteSet(context, id) {
        await ApiService.delete(`description-builder/qualities/sets/${id}`);
        await context.dispatch('fetchSets');
    },
    async deleteItemFromSet(context, data) {
        await ApiService.post(`description-builder/qualities/sets/remove-item/${data.setId}`, {
            "quality": data.itemId
        });
        await context.dispatch('fetchSets');
    }

}