const handleError = (err) => {
  console.log('handle error', err)
  document.body.innerHTML = '<h1>The clouds is not in a good mood</h1>'
}

function init() {
  api.getTree()
    .then(insertTable)
    .catch(handleError)
}

init()
