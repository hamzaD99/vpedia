const state = {
    user: {}
};
const getters = {
    user: state => state.user,
    token: state => state.user.token
};
const mutations = {
    login(state, { user, token }) {
        state.user = user;
        state.user.token = token;
    },
    logout(state) {
        state.user = {}
    }
};

const actions = {
    async login({ commit }, { user, token }){
        await commit('login', { user, token });
    },
    async logout({ commit }){
        await commit('logout');
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};