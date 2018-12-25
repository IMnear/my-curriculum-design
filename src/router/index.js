import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import imgPerson from '@/components/img-person'
import login from '@/components/login'
import loading from '@/components/loading'
import registration from '@/components/registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/imgPerson',
      name: 'imgPerson',
      component: imgPerson,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'loading',
      component: loading
    },
    {
      path: '/registration',
      name: 'registration',
      component: registration
    }
  ]
})
