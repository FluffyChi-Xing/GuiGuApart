import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import LayoutPage from "@/views/layout/LayoutPage.vue";
import DashBoard from "@/views/dashboard/DashBoard.vue";
import UserCenter from "@/views/usercenter/UserCenter.vue";
import LoginPage from "@/views/login/LoginPage.vue";
import UserManage from "@/views/UserManage/UserManage.vue";
import LookAndBook from "@/views/looking&book/LookAndBook.vue";
import AttributeManage from "@/views/attribute/AttributeManage.vue";
import axios from "axios";
import RoomManage from "@/views/roomManage/RoomManage.vue";
import ApartPage from "@/views/apartment/ApartPage.vue";
import ClientPage from "@/views/ClientManage/ClientPage.vue";
import IndenturePage from "@/views/indenture/IndenturePage.vue";
import ImageManage from "@/views/imagemanage/ImageManage.vue";
import PageNotFound from "@/views/pageNotFound/pageNotFound.vue";
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
        },
        {
          path: '/look',
          name: '看房预约管理',
          component: LookAndBook,
          meta: {
            title: '尚庭公寓 | 看房预约管理'
          },
        },
        {
          path: '/attribute',
          name: '属性管理',
          component: AttributeManage,
          meta: {
            title: '尚庭公寓 | 属性管理'
          },
        },
        {
          path: '/rooms',
          name: '客房管理',
          component: RoomManage,
          meta: {
            title: '尚庭公寓 | 客房管理'
          },
        },
        {
          path: '/apart',
          name: '公寓管理',
          component: ApartPage,
          meta: {
            title: '尚庭公寓 | 公寓管理',
          },
        },
        {
          path: '/client',
          name: '客户管理',
          component: ClientPage,
          meta: {
            title: '尚庭公寓 | 客户管理',
          },
        },
        {
          path: '/indenture',
          name: '租约管理',
          component: IndenturePage,
          meta: {
            title: '尚庭公寓 | 租约管理'
          }
        },
        {
          path: '/image',
          name: '营销管理',
          component: ImageManage,
          meta: {
            title: '尚庭公寓 | 营销管理'
          },
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
    },
    {
      path: '/notFound',
      name: '404',
      component: PageNotFound,
      meta: {
        title: '尚庭公寓 | 页面走丢了'
      }
    }
  ]
})
//页面名
const checkName = async (to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}
//white list
const whiteList = [
    '/login',
    '/notFound',
    '/image',
    '/indenture',
    '/client',
    '/apart',
    '/rooms',
    '/attribute',
    '/look',
    '/users',
    '/user',
    '/',
]
//refresh token
const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh').toString()
  if (refresh) {
    await axios.get(`http://localhost:3000/employee/refresh?refresh=${refresh}`).then((res) => {
      if (res.data.code === 200) {
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}


//前置路由守卫
router.beforeEach(async (to,from, next) => {
  await checkName(to)
  //判断访问地址是否在白名单中,如果在则直接跳转404页面
    if (whiteList.indexOf(to.path) === -1) {
        next('/notFound')
    } else {
        next()
    }
  NProgress.start()
})
//后置路由守卫
router.afterEach(async () => {
  //每次切换页面后刷新refresh token
  await refreshToken()
  NProgress.done()
})
export default router
