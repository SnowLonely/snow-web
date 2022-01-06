<template>
  <div>
    <a-menu
      :default-selected-keys="defaultSelected"
      :open-keys="openKeys"
      mode="inline"
      theme="dark"
      @openChange="onOpenChange"
      @click="onMenuClick"
    >
      <template v-for="item in menus">
        <a-menu-item v-if="!item.children" :key="item.key">
          <router-link :to="item.url">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";
import Storage from "good-storage";

export default {
  name: "Menus",
  components: {
    "sub-menu": SubMenu,
  },
  data() {
    return {
      defaultSelected: [],
      submitKeys: [],
      openKeys: [],
      menus: [
        {
          key: "1",
          title: "index",
          icon: "pie-chart",
          url: "/demo/demo1",
        },
        {
          key: "2",
          title: "Navigation 2",
          icon: "pie-chart",
          children: [
            {
              key: "2.1",
              title: "Navigation 3",
              icon: "pie-chart",
              children: [
                {
                  key: "2.1.1",
                  title: "Option 2.1.1",
                  icon: "mail",
                  url: "/demo/demo1",
                },
                {
                  key: "2.1.2",
                  title: "Option 2.1.2",
                  icon: "mail",
                  url: "/demo/demo1",
                },
                {
                  key: "2.1.3",
                  title: "Option 2.1.3",
                  icon: "mail",
                  url: "/demo/demo1",
                },
              ],
            },
          ],
        },
        {
          key: "3",
          title: "系统管理",
          icon: "pie-chart",
          children: [
            {
              key: "3.1",
              title: "菜单管理",
              icon: "pie-chart",
              url: "/system/menu",
            },
            {
              key: "3.2",
              title: "用户管理",
              icon: "pie-chart",
              url: "/system/user",
            },
            {
              key: "3.3",
              title: "Navigation 3",
              icon: "pie-chart",
              children: [
                {
                  key: "2.1.1",
                  title: "Option 2.1.1",
                  icon: "mail",
                  url: "/demo/demo1",
                },
                {
                  key: "2.1.2",
                  title: "Option 2.1.2",
                  icon: "mail",
                  url: "/demo/demo1",
                },
                {
                  key: "2.1.3",
                  title: "Option 2.1.3",
                  icon: "mail",
                  url: "/demo/demo1",
                },
              ],
            },
          ],
        },
        {
          key: "4",
          title: "Navigation 4",
          icon: "pie-chart",
          url: "/demo/demo1",
        },
      ],
    };
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );

      if (this.submitKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }

      Storage.set("openKeys", this.openKeys);
    },

    onMenuClick(item) {
      const data = [];

      data.push(item.key);
      Storage.set("defaultKeys", data);
    },

    setDefaultKeys() {
      const storageOpenKeys = Storage.get("openKeys");

      if (storageOpenKeys) {
        this.openKeys = storageOpenKeys;
      }

      const storageDefaultKey = Storage.get("defaultKeys", ["1"]);

      if (storageDefaultKey) {
        this.defaultSelected = storageDefaultKey;
      }
    },

    getSubmitKeys() {
      for (const menu in this.menus) {
        this.submitKeys.push(this.menus[menu].key);
      }
    },
  },
  beforeMount() {
    this.setDefaultKeys();
  },
  mounted() {
    this.getSubmitKeys();
  },
};
</script>

<style scoped></style>
