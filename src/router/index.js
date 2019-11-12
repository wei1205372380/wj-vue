import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import AppIndex from '@/components/home/index'

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'login',
          component: login
        },
        {
            path: '/index',
            name: 'AppIndex',
            component: AppIndex
        }
    ]
})
