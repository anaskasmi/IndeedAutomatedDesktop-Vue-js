export const getters = {

    items(state) {
        return state.items;
    },
    sets(state) {
        return state.sets;
    },
    createItemDialogVisible(state) {
        return state.createItemDialogVisible;
    },
    createSetDialogVisible(state) {
        return state.createSetDialogVisible;
    }
}