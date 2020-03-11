import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'
import Login from '../views/login/index.vue'
import SecondHome from '../views/home/second-home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: SecondHome
      }, {
        path: 'comment',
        name: 'Comment',
        component: () => import('../views/main/comment')
      }, {
        path: 'material',
        name: 'Material',
        component: () => import('../views/main/material')
      }, {
        path: 'articles',
        name: 'Articles',
        component: () => import('../views/main/article-list')
      }, {
        path: 'publish/:articleid?',
        name: 'Publish',
        component: () => import('../views/main/add-article')
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
