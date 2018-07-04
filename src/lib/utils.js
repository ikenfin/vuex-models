/*
  Normalize vuex namespace - add slashes if they are not presented
*/
const normalizeNamespace = (namespace = '') => {
  if (typeof namespace !== 'string') {
    namespace = ''
  }

  if (namespace.length > 0) {
    if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
  }

  return namespace;
}

/*
  Copypasted code from Vuex source
  Sad, but it's not exportable:(
*/
const normalizeMap = (map) => {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }) })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }) })
}

/*
  convert any name to uppercase format delimited by underscore
  Please, look at the test cases to get more info
*/
const toMutationName = (name) => {
  const parts = name.match(/([A-Z_]?[^A-Z_]*)/g).slice(0, -1)
  return parts.join('_').toUpperCase()
}

export {
  toMutationName,
  normalizeNamespace,
  normalizeMap
}