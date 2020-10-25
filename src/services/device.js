import axios from 'axios'

export function deviceGroupAdd(data) {
  return axios.post('/api/deviceGroup', data)
}