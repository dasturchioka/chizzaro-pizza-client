import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{ path: '/', redirect: '/menu' },
	{ path: '/menu', component: () => import('../pages/menu-page.vue') },
	{ path: '/account', component: () => import('../pages/account-page.vue') },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
