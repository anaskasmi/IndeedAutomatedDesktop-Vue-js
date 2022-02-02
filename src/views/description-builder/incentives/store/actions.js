import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchIncentivesItems(context) {
        const response = await ApiService.get('/description-builder/incentives/items');
        const items = response.data.data;
        context.commit('items', items)
    },
    async createIncentiveItem(context, item) {
        await ApiService.post(`description-builder/incentives/items`, item);
        context.dispatch('fetchIncentivesItems');
    },
    async updateIncentiveItem(context, item) {
        await ApiService.patch(`description-builder/incentives/items/${item._id}`, { name: item.name });
        context.dispatch('fetchIncentivesItems');
    },
    async deleteIncentiveItem(context, id) {
        await ApiService.delete(`description-builder/incentives/items/${id}`);
        context.dispatch('fetchIncentivesItems');
    },
    // sets
    async fetchSets(context) {
        const response = await ApiService.get('/description-builder/incentives/sets');
        const sets = response.data.data;
        await context.commit('sets', sets)
    },
    async createSet(context, set) {
        await ApiService.post(`description-builder/incentives/sets`, set);
        await context.dispatch('fetchSets');
    },
    async updateSet(context, set) {
        await ApiService.patch(`description-builder/incentives/sets/${set._id}`, set);
        await context.dispatch('fetchSets');
    },
    async deleteSet(context, id) {
        await ApiService.delete(`description-builder/incentives/sets/${id}`);
        await context.dispatch('fetchSets');
    },
    async deleteItemFromSet(context, data) {
        await ApiService.post(`description-builder/incentives/sets/remove-item/${data.setId}`, {
            "incentive": data.itemId
        });
        await context.dispatch('fetchSets');
    }

}