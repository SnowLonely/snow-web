<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider :trigger="null" v-model="collapsed" collapsible>
        <div class="logo" />
        <Menu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <Breadcrumb />
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '90%' }"
          >
            <router-view />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Menu from "./Menu.vue";
import Footer from "./Footer.vue";
import Breadcrumb from "./Breadcrumb.vue";

export default {
  components: {
    Header,
    Menu,
    Footer,
    Breadcrumb,
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style scoped>
.trigger {
  font-size: 20px;
  padding: 0 20px;
  line-height: 64px;
}
.trigger:hover {
  background-color: #eeeeee;
}
</style>
