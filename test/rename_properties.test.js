
import Vue from 'vue'
import Vuex from 'vuex'
import { genVuexModels, mapVuexModels } from '../src/index'

Vue.use(Vuex)

const { mutations, actions, getters } = genVuexModels([
  'hello'
], 'myState');

const store = new Vuex.Store({
  mutations,
  actions,
  getters,
  state: {
    myState: {}
  }
});

const fields = mapVuexModels({
  'world': 'hello'
});

const app = new Vue({
  store,
  computed: {
    ...fields
  },
  created () {
    this.world = 'is it works?'
  }
});

test('has property `world`', () => {
  expect(app.world).toEqual('is it works?')
})

test('vuex state has changed', () => {
  expect(store.state.myState.hello).toEqual('is it works?')
})