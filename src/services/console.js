import axios from 'axios'

export function deviceGroupSearch(data) {
  return axios.post('/api/deviceGroup/search', data)
}

export function deviceGroupSave(data) {
  return axios.post('/api/deviceGroup', data)
}

export function ec200Search(data) {
  return axios.post('/api/device/search', data)
}