import { createRouter, createWebHashHistory } from 'vue-router'
export const routes = [
    {
        path: '/',
        redirect: '/market',
    },
    {
        path: '/market',
        name: 'Market',
        component: () => import('@/views/market'),
        meta: { title: 'NFT 市场' },
    },
    {
        path: '/assets',
        name: 'Assets',
        component: () => import('@/views/assets'),
        meta: { title: '资产管理' },
    },
    {
        path: '/picture',
        name: 'Picture',
        component: () => import('@/views/picture'),
        meta: { title: '图片节点' },
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/views/chat'),
        meta: { title: 'chat 节点' },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '主页' },
      },
]

const router = createRouter({
    history: createWebHashHistory(), // hash 模式
    routes,
})

export default router
