import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ifLogin: false,
    login: {
      user: '',
      photo: ''
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
