const state = {
    message: '',
    show: false
};
const getters = {
    snackbar: state => state,
};
const mutations = {
    showSnackbar(state, message) {
        state.message = message;
        state.show = true;
    },
    hideSnackbar(state) {
        state.message = ''
        state.show = false;
    }
};

const actions = {
    async showSnackbar({ commit }, { message }){
        await commit('showSnackbar', message);
    },
    async hideSnackbar({ commit }){
        await commit('hideSnackbar');
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};