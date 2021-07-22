import Vue from 'vue'
import Vuex from 'vuex'
import { repostPageModule } from './repostingPage/index';
import { updatePageModule } from './updatePage/index';
import { resumePageModule } from './resumePage/index';
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        BASE_URL: 'http://127.0.0.1:3009/api',
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        repostPageModule,
        updatePageModule,
        resumePageModule
    }
});