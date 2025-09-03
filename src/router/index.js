import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutView from '../views/LayoutView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/homeView'
    },
    {
        path: '/',
        component: LayoutView,
        children: [
            {
                path: 'homeView',
                name: 'homeView',
                component: () => import('../views/HomeView.vue'),
            },
            {
                path: '/tutorial/introductionView',
                name: 'tutorial-introductionView',
                component: () => import('../views/tutorial/IntroductionView.vue'),
            },
            {
                path: '/tutorial/apiDocumentView',
                name: 'tutorial-apiDocumentView',
                component: () => import('../views/tutorial/ApiDocumentView.vue'),
            },
            {
                path: '/tutorial/aboutView',
                name: 'tutorial-aboutView',
                component: () => import('../views/tutorial/AboutView.vue'),
            },
            {
                path: '/tutorial/playGroundView',
                name: 'tutorial-playGroundView',
                component: () => import('../views/tutorial/PlayGroundView.vue')
            },
            {
                path: '/management/programPageView',
                name: 'management-programPageView',
                component: () => import('../views/management/ProgramPageView.vue')
            },
            {
                path: '/management/programDetailView',
                name: 'management-programDetailView',
                component: () => import('../views/management/ProgramDetailView.vue')
            },
            {
                path: '/management/jobPageView',
                name: 'management-jobPageView',
                component: () => import('../views/management/JobPageView.vue')
            },
            {
                path: '/management/jobDetailView',
                name: 'management-jobDetailView',
                component: () => import('../views/management/JobDetailView.vue')
            },
            {
                path: '/management/scriptPageView',
                name: 'management-scriptPageView',
                component: () => import('../views/management/ScriptPageView.vue')
            },
            {
                path: '/management/scriptDetailView',
                name: 'management-scriptDetailView',
                component: () => import('../views/management/ScriptDetailView.vue')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
