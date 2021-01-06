import Vue from 'vue'
import Vuex from 'vuex'
import cep from './modulos/cep'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cep,
  }
})
