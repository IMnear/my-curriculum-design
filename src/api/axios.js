import axios from 'axios'

let http = axios.create({
  baseURL: 'http://120.78.1.13:3000',
  // 默认接口地址可配置
  withCredentials: false,
  // 设置跨域 需要 true 不需要 false
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = ''
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})

function apiAxios (method, url, params, response) {
  // 如果本地有token 则全部请求 带上token
  let token = null
  if (localStorage.token) {
    console.log(localStorage.token)
    token = 'Bearer ' + localStorage.token
    console.log(token)
  }
  http({
    method: method,
    url: url,
    headers: {
      'Authorization': token || ''
    },
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
