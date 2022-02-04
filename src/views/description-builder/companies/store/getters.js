export const getters = {
    companies(state) {
        return state.companies;
    },
    createDialogVisible(state) {
        return state.createDialogVisible;
    },
    updateDialogVisible(state) {
        return state.updateDialogVisible;
    },
    companyUnderUpdate(state) {
        return state.companyUnderUpdate;
    },
}