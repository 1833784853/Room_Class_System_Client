import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    applyCount: 0
  },
  mutations: {
    updateApplyCount: (state, payload) => {
      state.applyCount = payload.count
    }
  },
  actions: {
  },
  modules: {
  }
})
