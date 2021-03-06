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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router