import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  if (newToken) {
    token = newToken
  }
}

const removeToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = ({ title, author, url }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const request = axios.post(baseUrl, { title, author, url }, config)
  return request.then((response) => response.data)
}

const updateOne = (id, data) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const request = axios.put(`${baseUrl}/${id}`, data, config)
  return request.then((response) => response.data)
}

const deleteOne = (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

const comment = (id, comment) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const request = axios.post(`${baseUrl}/${id}/comment`, { comment }, config)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  setToken,
  updateOne,
  deleteOne,
  comment,
  removeToken,
}
