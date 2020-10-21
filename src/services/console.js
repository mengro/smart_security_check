import axios from 'axios'

export function deviceGroup(data) {
  return axios.post('/api/deviceGroup/search', data)
}