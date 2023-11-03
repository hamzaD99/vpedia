import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import snackbar from './modules/snackbar';
import user from './modules/user';

const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    snackbar: snackbar,
    user: user
  },
});

export default store;