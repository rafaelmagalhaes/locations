import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: []
  },
  getters: {
    getLocations: state => state.locations
  },
  mutations: {
    setLocations (state, payload) {
      state.locations = payload
    }
  },
  actions: {
    async getLocations ({ commit }, payload) {
      await axios.get('https://s3-eu-west-1.amazonaws.com/omnifi/techtests/locations.json').then((res) => {
        commit('setLocations', res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})
