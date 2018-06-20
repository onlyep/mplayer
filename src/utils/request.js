import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

Vue.prototype.$http = axios;

axios.defaults.baseURL = 'http://localhost:8080/';

export const request = async (type = 'POST', url = '', data = {}) => {
  let result;
  type = type.toUpperCase();
  if (type === 'GET') {
    await axios.get(url, { params: data })
      .then(res => {
        result = res.data;
      });
  } else if (type === 'POST') {
    await axios.post(url, qs.stringify(data))
      .then(res => {
        result = res.data;
      });
  }
  return result;
};
