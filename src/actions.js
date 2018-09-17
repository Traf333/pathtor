const INDICATOR_IDS_KEY = 'indicator_ids'

const selectedIndicatorIds = () => {
  const idsParam = new URLSearchParams(location.search).get(INDICATOR_IDS_KEY)
  return idsParam ? idsParam.split(',').map(id => parseInt(id)) : []
}
const selected = id => selectedIndicatorIds().includes(id)
const subtreeSelected = subtree => /selected/.test(subtree)

const updateURL = newId => {
  let ids = selectedIndicatorIds()
  ids = ids.includes(newId) ? ids.filter(id => id !== newId) : [...ids, newId]

  const query = `?${INDICATOR_IDS_KEY}=${ids.join(',')}`
  history.pushState({}, '', query)
}

const markNode = node => node.classList.add('selected')
const unmarkNode = node => node.classList.remove('selected')

const selectPath = node => {
  markNode(node)
  const parentCell = node.closest('.flex-column')
  parentCell && selectPath(parentCell.previousElementSibling)
}

const childrenSelected = node => node.getElementsByClassName('selected').length

const deselectPath = node => {
  unmarkNode(node)
  const parentCell = node.closest('.flex-column')
  if (!parentCell || childrenSelected(parentCell)) return
  deselectPath(parentCell.previousElementSibling)
}

const togglePath = (node, id) => {
  selected(id) ? deselectPath(node) : selectPath(node)
  updateURL(id)
}
