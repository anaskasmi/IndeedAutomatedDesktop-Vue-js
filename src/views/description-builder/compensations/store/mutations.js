export const mutations = {

    items(state, newVal) {
        state.items = newVal;
    },
    sets(state, newVal) {
        state.sets = newVal;
    },
    createItemDialogVisible(state, newVal) {
        state.createItemDialogVisible = newVal;
    },
    createSetDialogVisible(state, newVal) {
        state.createSetDialogVisible = newVal;
    },

}