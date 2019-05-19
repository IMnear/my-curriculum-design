import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import imgPerson from '@/components/img-person'
import login from '@/components/login'
import loading from '@/components/loading'
import registration from '@/components/registration'
import my from '@/components/my'
import robot from '@/components/robot'
import news from '@/components/news'
import mylord from '@/components/mylord'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    children: [{
      path: '/imgPerson',
      name: 'imgPerson',
      component: imgPerson,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/registration',
      name: 'registration',
      component: registration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/robot',
      name: 'robot',
      component: robot,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/news',
      name: 'news',
      component: news,
      meta: {
        requiresAuth: true
      }
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/loading',
    name: 'loading',
    component: loading
  },
  {
    path: '/mylord',
    name: 'mylord',
    component: mylord
  }
  ]
})
