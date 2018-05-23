import Vue from 'vue'
import Router from 'vue-router'
import ListItems from '@/components/ListItems'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListItems',
      component: ListItems
    }
  ]
})
