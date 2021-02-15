/*
  Unit tests for util functions
*/

import {
  toMutationName,
  normalizeNamespace,
  normalizeMap,
  capitalize
} from '../src/lib/utils'

test('toMutationName function tests', () => {

  const validPairs = {
    'simple': 'SIMPLE',
    'sameField': 'SAME_FIELD',
    'same_field': 'SAME__FIELD',
    'underscored_Field': 'UNDERSCORED___FIELD',
    'underscored_field': 'UNDERSCORED__FIELD',
    'camelCaseField': 'CAMEL_CASE_FIELD',
    'underscored_camelCaseField': 'UNDERSCORED__CAMEL_CASE_FIELD',
    'FirstLetterIsUppercase': 'FIRST_LETTER_IS_UPPERCASE',
    '_underscoreIs_first': '_UNDERSCORE_IS__FIRST',
    '_UnderscoreAndUppercase': '__UNDERSCORE_AND_UPPERCASE',
    'multiple___underscoresInName': 'MULTIPLE______UNDERSCORES_IN_NAME',
    'ALREADYUPPERCASE': 'A_L_R_E_A_D_Y_U_P_P_E_R_C_A_S_E'
  }

  Object.keys(validPairs).forEach(key => {
    expect(toMutationName(key)).toBe(validPairs[key])
  })

})

test('normalizeNamespace function tests', () => {
  const validPairs = {
    'namespace': 'namespace/',
    'slashed/namespace': 'slashed/namespace/',
    'slash/on/end/': 'slash/on/end/'
  }

  Object.keys(validPairs).forEach(key => {
    expect(normalizeNamespace(key)).toBe(validPairs[key])
  });

  ['', false, null, NaN, {}, [], undefined].forEach(item => {
    expect(normalizeNamespace(item)).toBe('')
  });
})

test('normalizeMap function test', () => {

  // test simple array case
  const arr = [
    'field_1',
    'field_2',
    'anotherField',
    '__underscored_field'
  ]

  const normalizedArr = normalizeMap(arr)

  expect(normalizedArr).toBeInstanceOf(Array)

  normalizedArr.forEach((item, index) => {
    expect(item).toEqual({ key: arr[index], val: arr[index]})
  })

  // test remapping case
  const map = {
    'field_1': 'value_1',
    'field_2': 'value_2',
    'anotherField': 'ho ho ho, that\'s the value!',
    '__underscored_field': 'something here'
  }

  const normalizedMap = normalizeMap(map)

  expect(normalizedMap).toBeInstanceOf(Array)

  normalizedMap.forEach((item, index) => {
    expect(item.key).toEqual(Object.keys(map)[index])
    expect(item.val).toEqual(Object.values(map)[index])
  })
})

test('capitalize function test', () => {
  const validPairs = {
    'hello world': 'Hello world',
    'only_space_used_as_delimiter': 'Only_space_used_as_delimiter',
    'UPPERCASED WORDS': 'Uppercased words',
    '_underscoreTest': '_underscoretest',
    '1st': '1st',
    '1st and other': '1st and other'
  }

  Object.entries(validPairs).forEach(([value, expectedValue]) => {
    expect(capitalize(value)).toEqual(expectedValue)
  })
})