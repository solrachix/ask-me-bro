import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.SERVER_URL}/api`
})

export default api
