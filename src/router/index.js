import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import LayoutPage from "@/views/layout/LayoutPage.vue";
import DashBoard from "@/views/dashboard/DashBoard.vue";
import UserCenter from "@/views/usercenter/UserCenter.vue";
import LoginPage from "@/views/login/LoginPage.vue";
import UserManage from "@/views/UserManage/UserManage.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '首页',
      component: LayoutPage,
      meta: {
        title: '尚庭公寓 | 首页',
      },
      children: [
        {
          path: '',
          name: '仪表盘',
          component: DashBoard,
        },
        {
          path: '/user',
          name: '用户中心',
          component: UserCenter,
          meta: {
            title: '尚庭公寓 | 用户中心',
          }
        },
        {
          path: '/users',
          name: '用户管理',
          component: UserManage,
          meta: {
            title: '尚庭公寓 | 用户管理'
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录/注册',
      component: LoginPage,
      meta: {
        title: '尚庭公寓 | 登录页',
      },
    }
  ]
})
//页面名
const checkName = async (to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}
//前置路由守卫
router.beforeEach(async (to) => {
  await checkName(to)
  NProgress.start()
})
//后置路由守卫
router.afterEach(async () => {
  NProgress.done()
})
export default router
