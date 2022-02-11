import { state } from "./state";
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

export const DescriptionBuilderTagsModule = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};