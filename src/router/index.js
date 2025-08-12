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
                path: '/management/taskListView',
                name: 'management-taskListView',
                component: () => import('../views/management/TaskListView.vue')
            },
            {
                path: '/management/taskDetailView',
                name: 'management-taskDetailView',
                component: () => import('../views/management/TaskDetailView.vue')
            },
            {
                path: '/management/serviceListView',
                name: 'management-serviceListView',
                component: () => import('../views/management/ServiceListView.vue')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
