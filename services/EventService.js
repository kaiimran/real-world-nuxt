import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/real-world-nuxt/', // 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents () {
    return apiClient.get('/events')
  },
  getEvent (id) {
    return apiClient.get('/events/' + id)
  }
}
