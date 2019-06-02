import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      components: {
        default: Home,
        view_tow: () => import( './views/About.vue')
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
        view_tow: Home
      }
    },
    {
      path: '/grid',
      name: 'grid',
      components: {
        default: () => import('./components/NestedGrid.vue'),
        view_tow: () => import('./components/UniqueLayouts.vue'),
      }
    },
    {
      path: '/theme',
      name: 'theme',
      components: {
        default: () => import('./components/Theme.vue'),
        view_tow: null,
      }
    }
  ]
})