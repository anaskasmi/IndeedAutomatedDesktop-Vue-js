export const mutations = {

    companies(state, newVal) {
        state.companies = newVal;
    },
    createDialogVisible(state, newVal) {
        state.createDialogVisible = newVal;
    },
    updateDialogVisible(state, newVal) {
        state.updateDialogVisible = newVal;
    },
    companyUnderUpdate(state, newVal) {
        state.companyUnderUpdate = newVal;
    },


}