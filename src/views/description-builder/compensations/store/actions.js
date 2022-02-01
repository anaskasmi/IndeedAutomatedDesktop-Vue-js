import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchCompensationsItems(context) {
        const response = await ApiService.get('/description-builder/compensations/items');
        const items = response.data.data;
        context.commit('items', items)
    },
    async createCompensationItem(context, item) {
        await ApiService.post(`description-builder/compensations/items`, item);
        context.dispatch('fetchCompensationsItems');
    },
    async updateCompensationItem(context, item) {
        await ApiService.patch(`description-builder/compensations/items/${item._id}`, { name: item.name });
        context.dispatch('fetchCompensationsItems');
    },
    async deleteCompensationItem(context, id) {
        await ApiService.delete(`description-builder/compensations/items/${id}`);
        context.dispatch('fetchCompensationsItems');
    },
    // sets
    async fetchSets(context) {
        const response = await ApiService.get('/description-builder/compensations/sets');
        const sets = response.data.data;
        await context.commit('sets', sets)
    },
    async createSet(context, set) {
        await ApiService.post(`description-builder/compensations/sets`, set);
        await context.dispatch('fetchSets');
    },
    async updateSet(context, set) {
        await ApiService.patch(`description-builder/compensations/sets/${set._id}`, set);
        await context.dispatch('fetchSets');
    },
    async deleteSet(context, id) {
        await ApiService.delete(`description-builder/compensations/sets/${id}`);
        await context.dispatch('fetchSets');
    },
    async deleteItemFromSet(context, data) {
        await ApiService.post(`description-builder/compensations/sets/remove-item/${data.setId}`, {
            "compensation": data.itemId
        });
        await context.dispatch('fetchSets');
    }

}