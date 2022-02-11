export const getters = {
    tags(state) {
        return state.tags;
    },
    createDialogVisible(state) {
        return state.createDialogVisible;
    },
    updateDialogVisible(state) {
        return state.updateDialogVisible;
    },
    tagUnderUpdate(state) {
        return state.tagUnderUpdate;
    },
}