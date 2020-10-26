import axios from 'axios';

const url = location.hostname;
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://' + url + ':8000/dev_api';
} else {
  axios.defaults.baseURL = 'http://' + url + ':8000'
}

export const api_entry = axios.defaults.baseURL

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});