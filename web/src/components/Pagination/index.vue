<template>
  <el-pagination
    background
    class="at-pagination"
    @size-change="pageSizeChange"
    @current-change="pageChange"
    :current-page="page"
    :page-sizes="[20, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: Number,
    pageSize: Number,
    total: Number
  },
  methods: {
    pageChange(val) {
      this.$emit('pageChange', val)
    },
    pageSizeChange(val) {
      this.$emit('pageSizeChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.at-pagination {
  padding: 20px 0 40px;
  display: flex;
  justify-content: flex-end;
}
</style>
