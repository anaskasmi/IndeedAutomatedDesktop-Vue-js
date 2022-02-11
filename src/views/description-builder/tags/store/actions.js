import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchTags(context) {
        const response = await ApiService.get('/description-builder/tags');
        const tags = response.data.data;
        context.commit('tags', tags)
    },
    async createTag(context, tag) {
        await ApiService.post(`description-builder/tags`, tag);
        context.dispatch('fetchTags');
    },
    async updateTag(context, tag) {
        await ApiService.patch(`description-builder/tags/${tag._id}`, tag);
        context.dispatch('fetchTags');
    },
    async deleteTag(context, id) {
        await ApiService.delete(`description-builder/tags/${id}`);
        context.dispatch('fetchTags');
    },
}