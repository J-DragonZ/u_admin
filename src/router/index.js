import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from '../store/index.js'

function checkEnter(path, next) {
  if (store.state.userInfo.menus_url.includes(path)) {
    next()
  } else {
    next('/')
  }
}

export let indexRoutes = [
  {
    path: 'banner',
    component: () => import('../pages/banner/banner.vue'),
    name: '轮播图管理',
    beforeEnter(to, from, next) {
      checkEnter('/banner', next)
    }
  },
  {
    path: 'cate',
    component: () => import('../pages/cate/cate.vue'),
    name: '商品分类',
    beforeEnter(to, from, next) {
      checkEnter('/cate', next)
    }
  },
  {
    path: 'goods',
    component: () => import('../pages/goods/goods.vue'),
    name: '商品管理',
    beforeEnter(to, from, next) {
      checkEnter('/goods', next)
    }
  },
  {
    path: 'manage',
    component: () => import('../pages/manage/manage.vue'),
    name: '管理员管理',
    beforeEnter(to, from, next) {
      checkEnter('/manage', next)
    }
  },
  {
    path: 'member',
    component: () => import('../pages/member/member.vue'),
    name: '会员管理',
    beforeEnter(to, from, next) {
      checkEnter('/member', next)
    }
  },
  {
    path: 'menu',
    component: () => import('../pages/menu/menu.vue'),
    name: '菜单管理',
    beforeEnter(to, from, next) {
      checkEnter('/menu', next)
    }
  },
  {
    path: 'role',
    component: () => import('../pages/role/role.vue'),
    name: '角色管理',
    beforeEnter(to, from, next) {
      checkEnter('/role', next)
    }
  },
  {
    path: 'seckill',
    component: () => import('../pages/seckill/seckill.vue'),
    name: '秒杀活动',
    beforeEnter(to, from, next) {
      checkEnter('/seckill', next)
    }
  },
  {
    path: 'specs',
    component: () => import('../pages/specs/specs.vue'),
    name: '商品规格',
    beforeEnter(to, from, next) {
      checkEnter('/specs', next)
    }
  },
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../pages/home/home.vue'),
        },
        ...indexRoutes
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 如果去的是登录页,放行
  if (to.path === '/login') {
    next()
    return
  }
  // 不去登录,判断是否登录,登录了就放行
  if (store.state.userInfo.id) {
    next()
    return
  }
  next('/login')
})

export default router
