const handleError = (err) => {
  console.log('handle error', err)
  document.body.innerHTML = `<h1>${err.message}</h1>`
}

function init() {
  api.getTree()
    .then(insertTable)
    .catch(handleError)
}

init()
