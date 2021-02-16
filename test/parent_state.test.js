import Vue from 'vue'
import Vuex from 'vuex'
import { genVuexModels, mapVuexModels } from '../src/index'

Vue.use(Vuex)

const fields = genVuexModels([ 'myVariable' ], false)

const store = new Vuex.Store({
  modules: {
    test_no_state: {
      namespaced: true,
      state: {
        myVariable: 'initial value'
      },
      getters: {
        ...fields.getters
      },
      actions: {
        ...fields.actions
      },
      mutations: {
        ...fields.mutations
      }
    }
  }
})
const app = new Vue({
  store,
  computed: {
    ...mapVuexModels([ 'myVariable' ], 'test_no_state')
  }
})

test('parent state usage tests', () => {
  expect(app.myVariable).toEqual('initial value')
  app.myVariable = 'something another'
  expect(app.myVariable).toEqual('something another')
  expect(store.getters['test_no_state/Vxm_myVariable']).toEqual(
    'something another'
  )
})
