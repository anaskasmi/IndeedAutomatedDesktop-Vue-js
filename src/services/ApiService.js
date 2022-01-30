import axios from 'axios';
export const ApiService = {
    instance: axios.create({
        baseURL: 'http://localhost:3009/api',
    }),

    get(resource, slug = "") {
        return this.instance
            .get(`${resource}/${slug}`);
    },
    post(resource, data) {
        return this.instance.post(`${resource}`, data);
    },
    update(resource, slug, data) {
        return this.instance.put(`${resource}/${slug}`, data);
    },
    put(resource, data) {
        return this.instance.put(`${resource}`, data);
    },
    patch(resource, data) {
        return this.instance.patch(`${resource}`, data);
    },
    delete(resource) {
        return this.instance.delete(`${resource}`);
    }

};