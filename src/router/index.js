import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/Public.vue'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'public',
    component: Public,
    props: true
  },
//   {
//     path: '/admin',
//     name: 'admin',
//     component: Admin,
//     beforeEnter: (to, from, next) => {
//       if (!store.getters['auth/authenticated']) {
//         return next({
//           name: 'games'
//         })
//       }

//       next()
//     }
//   },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router