import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api/api";
import { doGet, doPost, doPut, doDelete } from "@/utils/http";
import { Button, Layout, Breadcrumb, Icon, Menu } from "ant-design-vue";

Vue.config.productionTip = false;

Vue.prototype.$get = doGet;
Vue.prototype.$post = doPost;
Vue.prototype.$put = doPut;
Vue.prototype.$delete = doDelete;
Vue.prototype.$api = api;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Icon);
Vue.use(Menu);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
