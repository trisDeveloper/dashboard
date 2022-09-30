import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    userdata: {
      id: "",
      events: [],
      links: [],
      city: "",
    },
  },
  mutations: {
    // removeToken(state) {
    //   state.token = "";
    //   state.isAuthenticated = false;
    // },
  },
  actions: {},
  modules: {},
});
