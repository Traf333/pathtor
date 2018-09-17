const REMOTE_SERVICE_URL = 'https://kf6xwyykee.execute-api.us-east-1.amazonaws.com/production/tree/input'

const api = {
  getTree: async () => {
    const response = await fetch(REMOTE_SERVICE_URL)
    const data = await response.json()
    return data
  },
}
