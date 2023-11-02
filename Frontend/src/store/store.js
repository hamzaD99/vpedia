import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import snackbarModule from './modules/snackbar';

const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    snackbar: snackbarModule,
  },
});

export default store;