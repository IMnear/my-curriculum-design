import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import imgPerson from '@/components/img-person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/imgPerson',
      name: 'imgPerson',
      component: imgPerson
    }
  ]
})
