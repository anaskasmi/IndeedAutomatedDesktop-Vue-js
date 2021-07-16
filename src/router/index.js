import Vue from 'vue'
import VueRouter from 'vue-router'
import RepostingIndex from '../views/RepostingIndex.vue'
import UpdatingIndex from '../views/UpdatingIndex.vue'
import ResumeIndex from '../views/ResumeIndex.vue'
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
    }, {
        path: '/resumeTransfer',
        name: 'ResumeIndex',
        component: ResumeIndex
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router