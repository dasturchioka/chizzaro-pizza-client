import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{ path: '/', component: () => import("../pages/home-page.vue") },
	{ path: '/menu/:id', component: () => import('../pages/menu-page.vue') },
	{ path: '/item/:id', component: () => import('../pages/item-show-page.vue') },
	{ path: '/account', component: () => import('../pages/account-page.vue') },
	{ path: '/cart', component: () => import('../pages/cart-page.vue') },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
