/*
  Unit tests for namespaced store

  Check that default state setting works:

  genVuexModels({
    field: <DEFAULT_STATE>
  })
*/

import Vue from 'vue'
import Vuex from 'vuex'
import { genVuexModels, mapVuexModels } from '../src/index'

Vue.use(Vuex)

const NAMESPACE = 'test_namespace'
const testDefaultValue = 'world'
const testDefaultObject = {
  property_1: 'custom_property',
  property_2: 'other property',
  array_here: ['one', 'two', 'three']
}
const testAnotherDefaultObject = {
  lol: 'catz',
  more_arrays: ['minus', 'plus', 0, '=']
}

const models = genVuexModels({
  hello: testDefaultValue,
  look_ma_its_an_object: testDefaultObject
}, 'myState');

const store = new Vuex.Store({
  modules: {
    [NAMESPACE]: {
      namespaced: true,
      ...models
    }
  }
});

const fields = mapVuexModels(['hello', 'look_ma_its_an_object'], NAMESPACE);

const mappedState = Vuex.mapState(NAMESPACE, ['myState']);

const app = new Vue({
  store,
  computed: {
    mappedState: mappedState.myState,
    ...fields
  }
});

const checkStateValue = (field, val) => {
  expect(app.mappedState[field]).toEqual(val);
  expect(store.state[NAMESPACE].myState[field]).toEqual(val);
  expect(app[field]).toEqual(val);
}

test('state has default value', () => {
  checkStateValue('hello', testDefaultValue);
});

test('state has default object as value', () => {
  checkStateValue('look_ma_its_an_object', testDefaultObject);
});

test('default state change using dispatch', () => {
  app.$store.dispatch(`${NAMESPACE}/setVxm_Hello`, 'dispatched');
  checkStateValue('hello', 'dispatched');

  app.$store.dispatch(`${NAMESPACE}/setVxm_Look_ma_its_an_object`, testAnotherDefaultObject);
  checkStateValue('look_ma_its_an_object', testAnotherDefaultObject);
});

test('default state change using model setter', () => {
  app.hello = 'setter';
  checkStateValue('hello', 'setter');

  app.look_ma_its_an_object = testAnotherDefaultObject;
  checkStateValue('look_ma_its_an_object', testAnotherDefaultObject);
});

test('default state change using mutation', () => {
  app.$store.commit(`${NAMESPACE}/VXM__HELLO`, 'mutated')
  checkStateValue('hello', 'mutated');

  app.$store.commit(`${NAMESPACE}/VXM__LOOK__MA__ITS__AN__OBJECT`, testAnotherDefaultObject);
  checkStateValue('look_ma_its_an_object', testAnotherDefaultObject);
});