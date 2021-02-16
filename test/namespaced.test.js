/*
  Unit tests for namespaced store
*/

import Vue from 'vue'
import Vuex from 'vuex'
import { genVuexModels, mapVuexModels } from '../src/index'

Vue.use(Vuex)

const NAMESPACE = 'test_namespace'
const NS = `${NAMESPACE}/Vxm_hello`

const { mutations, actions, getters, state } = genVuexModels([
  'hello'
], 'myState');

const store = new Vuex.Store({
  modules: {
    [NAMESPACE]: {
      namespaced: true,
      mutations,
      actions,
      getters,
      state
    }
  }
});

const fields = mapVuexModels(['hello'], NAMESPACE);

const mappedState = Vuex.mapState(NAMESPACE, ['myState']);
const mappedAction = Vuex.mapActions(NAMESPACE, ['setVxm_Hello']);

const app = new Vue({
  store,
  computed: {
    mappedState: mappedState.myState,
    ...fields
  },
  methods: {
    mappedAction: mappedAction.setVxm_Hello
  }
});

const checkHelloState = (value) => {
  expect(store.getters[NS]).toBe(value)
  expect(app.mappedState.hello).toBe(value)
  expect(app.hello).toBe(value)
}

test('has hello getter/action/mutation', () => {
  expect(getters.Vxm_hello).toBeDefined()
  expect(actions.setVxm_Hello).toBeDefined()
  expect(mutations.VXM__HELLO).toBeDefined()
})

// eslint-disable-next-line jest/expect-expect
test('use mapped action', () => {
  app.mappedAction('mapped action')
  checkHelloState('mapped action')
})

// eslint-disable-next-line jest/expect-expect
test('use dispatch', () => {
  app.$store.dispatch(`${NAMESPACE}/setVxm_Hello`, 'dispatched')
  checkHelloState('dispatched')
})

// eslint-disable-next-line jest/expect-expect
test('use model setter', () => {
  app.hello = 'setter'
  checkHelloState('setter')
})

// eslint-disable-next-line jest/expect-expect
test('use mutation', () => {
  app.$store.commit(`${NAMESPACE}/VXM__HELLO`, 'mutated')
  checkHelloState('mutated')
})