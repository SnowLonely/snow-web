<template>
  <div>
    <a-pagination
      :default-current="1"
      :default-page-size="defaultPageSize"
      :current="current"
      :total="total"
      :page-size-options="pageSizeOptions"
      show-size-changer
      @showSizeChange="onShowSizeChange"
      @change="onChange"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span>{{ props.value }}条/页</span>
      </template>
    </a-pagination>
  </div>
</template>
<script>
export default {
  props: ["total"],
  data() {
    return {
      defaultPageSize: 10,
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      current: 1,
      pageSize: 10,
    };
  },
  methods: {
    onChange(page, pageSize) {
      this.current = page;
      this.pageSize = pageSize;
      // 页码发生变化后，调用父组件方法进行请求
      this.$emit("pageRequest", page, pageSize);
    },

    onShowSizeChange(page, pageSize) {
      this.current = page;
      this.defaultPageSize = pageSize;

      // 每页展示条数发生变化后，调用父组件方法进行请求
      this.$emit("pageRequest", page, pageSize);
    },
  },
};
</script>
