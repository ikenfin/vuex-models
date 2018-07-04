/*
  vuex-model
  Simple getter/action/mutation generator and getter/setter mapper for vuex

  @author: ikenfin
*/

import Vue from 'vue';
import capitalize from 'capitalize';

import {
  toMutationName,
  normalizeMap,
  normalizeNamespace
} from './lib/utils';

/*
  action/mutation/getter prefix
  used to prevent collisions with user defined code
*/
const PREFIX = 'Vxm';

/*
  Generate getter/action/mutation's for vuex store
  storeAttr - is required state attribute name - this holds values
*/
const genVuexModels = (fields, storeAttr = null) => {
  const result = {
    getters: {},
    actions: {},
    mutations: {},
    state: {}
  }

  if (storeAttr !== false) {
    if (!storeAttr) {
      storeAttr = PREFIX
    }
    result.state[storeAttr] = {}
  }

  fields.reduce(function (prev, field) {
    prev.getters[`${PREFIX}_${field}`] = function (state) {
      return storeAttr !== false ? state[storeAttr][field] : state[field]
    }
    prev.actions[`set${PREFIX}_${capitalize(field)}`] = function ({ commit }, data) {
      commit(toMutationName(`${PREFIX}_${field}`), data)
    }
    prev.mutations[toMutationName(`${PREFIX}_${field}`)] = function (state, value) {
      storeAttr !== false ? Vue.set(state[storeAttr], field, value) : Vue.set(state, field, value)
    }

    return prev
  }, result)

  return result
}

/*
  Create { actions, getters, mutations } object to be injected in components
*/
const mapVuexModels = (models, namespace = '') => {
  namespace = normalizeNamespace(namespace)
  models = normalizeMap(models)

  return models.reduce(function (prev, {key, val}) {
    prev[key] = {
      get () {
        return this.$store.getters[`${namespace}${PREFIX}_${val}`]
      },
      set (value) {
        this.$store.dispatch(`${namespace}set${PREFIX}_${capitalize(val)}`, value)
      }
    }

    return prev
  }, {});
}

export {
  genVuexModels,
  mapVuexModels
}