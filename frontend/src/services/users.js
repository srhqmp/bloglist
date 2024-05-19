import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createUser = ({ username, name, password }) => {
  const request = axios.post(baseUrl, { username, name, password })
  return request.then((response) => response.data)
}

export default { getAll, createUser }
