import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    codePen: {},
    blog: [],
    per5Pages: 1,
    labels:[],
  },
  getters: {
    per100Pages: state => { 
      return Math.ceil(state.per5Pages / 20)
    }
  },
  mutations: {
    setPer5Pages(state, n) {
      state.per5Pages = n
    },
    setBlog(state, [list, page]) {
      if (page == 1) {
        state.blog = list
      } else {
        state.blog = state.blog.concat(list)
      }
    }
  },
  actions: {

  }
})