// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/Login.vue"
import Main from "../components/Main.vue"

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true } // 需要登录才能访问
  }
]

const router = createRouter({
  history: createWebHistory(), // 修改为浏览器历史模式
  routes
})

// 全局前置守卫：验证登录状态
router.beforeEach((to, from) => {
  // 如果目标路由需要认证且未登录，则重定向到登录页
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return {
      name: 'Login',
      query: { redirect: to.fullPath } // 保存目标路径用于登录后跳转
    }
  }
})

export default router