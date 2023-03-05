import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: '首页' }
    },
    {
      path: '/hot',
      name: 'hot',
      component: () => import('./views/Hot.vue'),
      meta: { title: '热门' }

    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('./views/Archive.vue'),
      meta: { title: '归档' }
    },
    {
      path: "/archive/:number",
      name: "blogContent",
      component: () => import('./components/BlogContent.vue'),
      meta: { title: '文章加载中···' }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})