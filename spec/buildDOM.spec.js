// Test helpers
const document = {
  createElement: node => ({ nodeName: node }),
}

const location = { search: '' }

const errorMessage = (value, expected) => `Failed result. ¯\\_(ツ)_/¯ \nPassed value: ${value} \nExpected: ${expected}`
const assert = (value, expected) => {
  if (value !== expected) throw Error(errorMessage(value, expected))
}

// Tested value
const { selected, subtreeSelected } = require('../src/actions')
const { buildTable } = require('../src/buildDOM')
const data = require('./fixtures.json')

// Setup
global.document = document
global.selected = selected
global.subtreeSelected = subtreeSelected
global.location = location

const subject = () => buildTable(data)

const indicatorNamesRegex = /Hypertension|Total/


// Check that building dom works
assert(indicatorNamesRegex.test(subject().innerHTML), true)

//Check that tree is not selected
assert(/selected/.test(subject().innerHTML), false)

//Tree has selected nodes if params set in URL
location.search = 'indicator_ids=12'
assert(/selected/.test(subject().innerHTML), true)

console.log('Dancing... test are passed! ᕕ( ᐛ )ᕗ')
