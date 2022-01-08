<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <slot v-for="item in breadList">
        <a-breadcrumb-item>{{ item.meta.title }}</a-breadcrumb-item>
      </slot>
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

      this.breadList = center;
    },
  },
  created() {
    this.getBreadcrumb();
  },
};
</script>

<style scoped></style>
