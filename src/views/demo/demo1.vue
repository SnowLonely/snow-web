<template>
  <div>
    <div>demo1</div>
    <a-button type="">按钮</a-button>
    <Paging :total="100" @pageRequest="toRequest" />
  </div>
</template>

<script>
import Paging from "@/components/Pagination";

export default {
  components: {
    Paging,
  },
  methods: {
    toRequest(page, size) {
      console.log("请求第" + page + "页的" + size + "条内容");
    },
  },
};
</script>

<style scoped></style>
