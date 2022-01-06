<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <router-link
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
      >
        <a-breadcrumb-item>{{ item.meta.title }}</a-breadcrumb-item>
      </router-link>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      breadList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      const { matched } = this.$route;

      const center = [];

      for (let i = 0; i < matched.length; i++) {
        center.push(matched[i]);
      }
      console.log(center.length);

      this.breadList = center;
    },
  },
  created() {
    this.getBreadcrumb();
  },
};
</script>

<style scoped></style>
