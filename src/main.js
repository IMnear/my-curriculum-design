// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Api from './api/axios.js'
import store from './store/index'
import echarts from 'echarts'
const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)
Vue.prototype.$echarts = echarts
Vue.prototype.$api = Api
Vue.prototype.$store = store

Vue.config.productionTip = false
Vue.use(ElementUI)

// 判断是否登陆路由钩子
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.token) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
