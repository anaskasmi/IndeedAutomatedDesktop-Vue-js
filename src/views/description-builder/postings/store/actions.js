import { ApiService } from "../../../../services/ApiService"

export const actions = {
    async fetchPostings(context) {
        const response = await ApiService.get('/description-builder/postings');
        const postings = response.data.data;
        context.commit('postings', postings)
    },
    async createPosting(context, posting) {
        await ApiService.post(`description-builder/postings`, posting);
        context.dispatch('fetchPostings');
    },
    async deletePosting(context, id) {
        await ApiService.delete(`description-builder/postings/${id}`);
        context.dispatch('fetchPostings');
    },
}