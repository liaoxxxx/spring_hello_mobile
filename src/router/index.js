import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Goods from '../components/Goods'
import confirmOrder from '../components/confirmOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    }
  ]
})
