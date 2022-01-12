<template>
  <div>
    <div class="table">
      <a-table
        :columns="columns"
        :data-source="tabData"
        :pagination="false"
        bordered
        size="small"
        :scroll="{ x: 1000 }"
      >
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
        <span slot="action">
          <a-space>
            <a-button type="primary" size="small">查看</a-button>
            <a-button class="edit-btn" size="small">查看</a-button>
            <a-button type="danger" size="small">删除</a-button>
          </a-space>
        </span>
      </a-table>
    </div>
    <Paging class="pagination" :total="100" @pageRequest="toRequest" />
  </div>
</template>

<script>
import Paging from "@/components/Pagination";

export default {
  components: {
    Paging,
  },
  data() {
    return {
      columns,
      tabData: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
    };
  },
  methods: {
    toRequest(page, size) {
      console.log("请求第" + page + "页的" + size + "条内容");
    },
  },
};

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    align: "center",
    width: 50,
    ellipsis: true,
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    align: "center",
    ellipsis: true,
  },
  {
    title: "人数",
    dataIndex: "people",
    key: "people",
    align: "center",
    ellipsis: true,
  },
  {
    title: "存在",
    dataIndex: "have",
    key: "have",
    align: "center",
    ellipsis: true,
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    align: "center",
    ellipsis: true,
  },
  {
    title: "标签",
    key: "tags",
    dataIndex: "tags",
    align: "center",
    scopedSlots: { customRender: "tags" },
    ellipsis: true,
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    fixed: "right",
    width: 200,
    scopedSlots: { customRender: "action" },
  },
];
</script>

<style scoped>
.table {
  padding: 10px;
}
.pagination {
  float: right;
}
</style>
