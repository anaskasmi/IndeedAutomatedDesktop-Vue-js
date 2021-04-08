import Vue from 'vue'
import VueRouter from 'vue-router'
import RepostingIndex from '../views/RepostingIndex.vue'
import UpdatingIndex from '../views/UpdatingIndex.vue'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'HomePage',
        component: HomePage
    }, {
        path: '/reposting',
        name: 'RepostingIndex',
        component: RepostingIndex
    },
    {
        path: '/updating',
        name: 'UpdatingIndex',
        component: UpdatingIndex
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router