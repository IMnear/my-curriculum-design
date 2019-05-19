import axios from 'axios'

let http = axios.create({
  baseURL: 'http://120.78.1.13:3000',
  // 默认接口地址可配置
  withCredentials: false,
  // 设置跨域 需要 true 不需要 false
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
  // 默认是json,"form-data 需要配置以下东西"
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // },
  // transformRequest: [function (data) {
  //   let newData = ''
  //   for (let k in data) {
  //     if (data.hasOwnProperty(k) === true) {
  //       newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  //     }
  //   }
  //   return newData
  // }]
})

function apiAxios (method, url, params, response) {
  // 如果本地有token 则全部请求 带上token
  let token = null
  if (localStorage.token) {
    token = 'Bearer ' + localStorage.token
  }
  http({
    method: method,
    url: url,
    headers: {
      'Authorization': token || ''
    },
    //  data 体内传 ，params url 上传 通常 post和put data get和delete url params
    data: method === 'POST' || method === 'DELETE' ? params : null,
    params: method === 'GET' || method === 'GET' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
    console.log(err)
    if (typeof (err.response) === 'object') {
      if (err.response.hasOwnProperty('status')) {
        console.log(err.response.status, '捕捉错误码')
        if (err.response.status === 401) {
          // token验证失效,清理本地token,并到登录页
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          location.href = '#/login'
        }
      }
    } else {
      console.log('不是对象')
    }
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
