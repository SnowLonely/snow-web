<template>
  <div>
    <a-menu
      :default-selected-keys="defaultSelected"
      :default-open-keys="openKeys"
      :open-keys="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="expand"
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
  components: {
    "sub-menu": SubMenu,
  },
  data() {
    return {
      defaultSelected: [],
      submitKeys: [],
      openKeys: [],
      expand: false,
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
                  url: "/demo/demo2",
                },
                {
                  key: "2.1.3",
                  title: "Option 2.1.3",
                  icon: "mail",
                  url: "/demo/demo3",
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
                  key: "3.3.1",
                  title: "Option 2.1.1",
                  icon: "mail",
                  url: "/demo/demo1",
                },
                {
                  key: "3.3.2",
                  title: "Option 2.1.2",
                  icon: "mail",
                  url: "/demo/demo2",
                },
                {
                  key: "3.3.3",
                  title: "Option 2.1.3",
                  icon: "mail",
                  url: "/demo/demo3",
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
    // 点击菜单时候的操作
    onOpenChange(openKeys) {
      if(openKeys != "") {
        const latestOpenKey = openKeys.find(
          (key) => this.openKeys.indexOf(key) === -1
        );

        if (this.submitKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
        
        Storage.set("openKeys", this.openKeys);
      } else {
        this.openKeys = []
      }
    },

    // 点击按钮时的操作
    onMenuClick(item) {
      const data = [];

      data.push(item.key);
      Storage.set("defaultKeys", data);
    },

    // 设置默认打开菜单以及选择按钮
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

    //  设置选择的菜单按钮
    getSubmitKeys() {
      for (const menu in this.menus) {
        this.submitKeys.push(this.menus[menu].key);
      }
    },

    // 设置菜单栏伸缩造成的打开菜单问题 
    changeMenuOpenKeyStatus() {
      this.expand = !this.expand;

      if(this.expand) {
        this.openKeys = [];
      } else {
        const storageOpenKeys = Storage.get("openKeys");
        if (storageOpenKeys) {
          this.openKeys = storageOpenKeys;
        }
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
