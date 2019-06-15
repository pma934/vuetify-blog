import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'), //  lazy-loaded
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('./views/Grid.vue')

    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('./views/Theme.vue')
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('./views/Archive.vue')
    },
    {
      path: "/archive/:number",
      component: () => import('./components/BlogContent.vue')
    },

  ]
})