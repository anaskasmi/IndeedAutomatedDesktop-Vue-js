import Vue from 'vue'
import Vuex from 'vuex'
import { repostPageModule } from './repostingPage/index';
import { updatePageModule } from './updatePage/index';
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        BASE_URL: 'http://localhost:3009/api',
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        repostPageModule,
        updatePageModule
    }
});