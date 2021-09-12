import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from './components/HomeComponent.vue'
import AgileComponent from './components/AgileComponent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/:type',
      name: 'agile',
      component: AgileComponent
    },
  ]
})