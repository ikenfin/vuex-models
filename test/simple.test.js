/*
  Unit tests for simple use case - non namespaced store
*/

import Vue from 'vue'
import Vuex from 'vuex'
import { genVuexModels, mapVuexModels } from '../src/index'

Vue.use(Vuex)

const { mutations, actions, getters, state } = genVuexModels([
  'hello'
], 'myState');

const store = new Vuex.Store({
  mutations,
  actions,
  getters,
  state
});

const fields = mapVuexModels(['hello']);

const app = new Vue({
  store,
  computed: {
    ...fields
  }
});

const checkHelloState = (value) => {
  expect(store.getters.Vxm_hello).toBe(value)
  expect(store.state.myState.hello).toBe(value)
  expect(app.hello).toBe(value)
}

test('state field usage tests', () => {
  const modelsWithoutStateVar = genVuexModels(['withoutStateVar'])
  expect(modelsWithoutStateVar.state.Vxm).toBeDefined()

  const modelsWithCustomStateVar = genVuexModels(['withStateVar'], 'stateVar')
  expect(modelsWithCustomStateVar.state.stateVar).toBeDefined()

  const modelsWithoutOwnState = genVuexModels(['alreadyDefinedStateVariable'], false)
  expect(modelsWithoutOwnState.state).toMatchObject({})
})

test('has hello getter/action/mutation', () => {
  expect(getters.Vxm_hello).toBeDefined()
  expect(actions.setVxm_Hello).toBeDefined()
  expect(mutations.VXM__HELLO).toBeDefined()
})

test('use dispatch', () => {
  app.$store.dispatch('setVxm_Hello', 'dispatched')
  checkHelloState('dispatched')
})

test('use model setter', () => {
  app.hello = 'setter'
  checkHelloState('setter')
})

test('use mutation', () => {
  app.$store.commit('VXM__HELLO', 'mutated')
  checkHelloState('mutated')
})