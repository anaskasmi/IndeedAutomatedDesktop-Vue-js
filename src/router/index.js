import Vue from 'vue'
import VueRouter from 'vue-router'
import RepostingIndex from '../views/RepostingIndex.vue'
import UpdatingIndex from '../views/UpdatingIndex.vue'
import ResumeTransfer from '../views/ResumeIndex.vue'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'HomePage',
        component: HomePage
    }, {
        path: '/reposting',
        name: 'JobsReposter',
        component: RepostingIndex
    },
    {
        path: '/updating',
        name: 'JobsEditor',
        component: UpdatingIndex
    }, {
        path: '/resumeTransfer',
        name: 'ResumeTransfer',
        component: ResumeTransfer
    },
    {
        path: '/crealetReports',
        name: 'CrealetReports',
        component: () =>
            import ('@/views/crealet-reports/CrealetReports.vue')
    },
    {
        path: '/indeedInvoices',
        name: 'IndeedInvoices',
        component: () =>
            import ('@/views/indeed-invoices/IndeedInvoices.vue')
    },
    {
        path: '/descriptionBuilder',
        name: 'DescriptionBuilder',
        component: () =>
            import ('@/views/description-builder/DescriptionBuilder.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router