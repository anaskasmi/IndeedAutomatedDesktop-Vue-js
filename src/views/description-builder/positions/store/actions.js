import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchPositionsItems(context) {
        const response = await ApiService.get('/description-builder/positions/items');
        const items = response.data.data;
        context.commit('items', items)
    },
    async createPositionItem(context, item) {
        await ApiService.post(`description-builder/positions/items`, item);
        context.dispatch('fetchPositionsItems');
    },
    async updatePositionItem(context, item) {
        await ApiService.patch(`description-builder/positions/items/${item._id}`, { name: item.name });
        context.dispatch('fetchPositionsItems');
    },
    async deletePositionItem(context, id) {
        await ApiService.delete(`description-builder/positions/items/${id}`);
        context.dispatch('fetchPositionsItems');
    },
    // sets
    async fetchSets(context) {
        const response = await ApiService.get('/description-builder/positions/sets');
        const sets = response.data.data;
        await context.commit('sets', sets)
    },
    async createSet(context, set) {
        await ApiService.post(`description-builder/positions/sets`, set);
        await context.dispatch('fetchSets');
    },
    async updateSet(context, set) {
        await ApiService.patch(`description-builder/positions/sets/${set._id}`, set);
        await context.dispatch('fetchSets');
    },
    async deleteSet(context, id) {
        await ApiService.delete(`description-builder/positions/sets/${id}`);
        await context.dispatch('fetchSets');
    },
    async deleteItemFromSet(context, data) {
        await ApiService.post(`description-builder/positions/sets/remove-item/${data.setId}`, {
            "position": data.itemId
        });
        await context.dispatch('fetchSets');
    }

}