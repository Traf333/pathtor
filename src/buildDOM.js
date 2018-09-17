const treePath = ['sub_themes', 'categories', 'indicators']
const tableSizes = [4, 3, 1]

const templates = {
  cell: (name, selected = false) => `<div class="flex-1 bordered p1 ${selected && 'selected'}">${name}</div>`,
  cellRows: ({ subtree, size }) => `<div class="flex-column flex-${size}">${subtree}</div>`,
  indicatorCell: ({ id, name }, selected) =>
    `<div class="flex-1 bordered p1 ${selected && 'selected'}" onclick="togglePath(this, ${id})">${name}</div>`,
}

const cell = (item, depth = 0) => {
  const namespace = treePath[depth]
  if (!namespace) {
    return templates.indicatorCell(item, selected(item.id))
  }
  const name = [item.name, item.unit].join(' ')
  const subtree = item[namespace] && item[namespace].map(i => cell(i, depth + 1)).join('')
  if (!subtree) return templates.cell(name)

  return `
    <div class="flex flex-row">
        ${templates.cell(name, subtreeSelected(subtree))}  
        ${templates.cellRows({ subtree, size: tableSizes[depth] })}
    </div>
  `
}

const buildTable = data => {
  const div = document.createElement('div')
  div.innerHTML = data.map(item => cell(item, 0)).join('')
  return div
}

const insertTable = data => {
  const fragment = document.createDocumentFragment()
  fragment.append(buildTable(data))
  document.getElementById('main').appendChild(fragment)
}
