const REMOTE_SERVICE_URL = 'https://kf6xwyykee.execute-api.us-east-1.amazonaws.com/production/tree/input'
const RETRY_TIMES = 3

function ExternalServerError(message) {
  this.message = message
}

async function fetch_retry(url, times) {
  for (let i = 0; i < times; i++) {
    const response = await fetch(url)
    if (response.ok) return response
  }
}

const api = {
  getTree: async () => {
    const response = await fetch_retry(REMOTE_SERVICE_URL, RETRY_TIMES)
    if (!response) throw new ExternalServerError('The clouds is not in a good mood')
    return await response.json()
  },
}
