import Vue from "vue";
import VueRouter from "vue-router";
import PowerLack from "../views/error/401.vue";
import Forbidden from "../views/error/403.vue";
import Notfound from "../views/error/404.vue";
import ServiceError from "../views/error/500.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/InitialLayout.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        meta: { title: "登录" },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      },
    ],
  },
  {
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/InitialLayout.vue"),
    children: [
      {
        path: "/register",
        name: "Register",
        meta: { title: "注册" },
        component: () =>
          import(/* webpackChunkName: "register" */ "../views/Register.vue"),
      },
    ],
  },
  {
    path: "/demo",
    meta: { title: "案例" },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BaseLayout.vue"),
    children: [
      {
        path: "/demo/demo1",
        name: "Demo",
        meta: { title: "案例1" },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/demo/demo1.vue"),
      },
      {
        path: "/demo/demo2",
        name: "Demo",
        meta: { title: "案例2" },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/demo/demo2.vue"),
      },
      {
        path: "/demo/demo3",
        name: "Demo",
        meta: { title: "案例3" },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/demo/demo3.vue"),
      },
    ],
  },
  {
    path: "/401",
    name: 401,
    component: PowerLack,
  },
  {
    path: "/403",
    name: 403,
    component: Forbidden,
  },
  {
    path: "/500",
    name: 500,
    component: ServiceError,
  },
  {
    path: "*",
    name: 404,
    component: Notfound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫,开始   去哪页，现在在那页，执行方法
router.beforeEach((to, from, next) => {
  // 加载内容

  // 载入下面
  next();
});

// 路由守卫，结束
router.afterEach(() => {
  // 结束内容
});

export default router;
