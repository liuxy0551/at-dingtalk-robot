<template>
  <div class="app-container">
    <ReplyTableSearch @fetchData="fetchData" />

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column fixed="left" align="center" label="序号" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewReplyRecord(scope.row)">{{ (page - 1) * pageSize + scope.$index + 1 }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="群聊名称" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.name || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="回复内容" align="center" min-width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.msg || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
    </el-table>

    <Pagination :page="page" :pageSize="pageSize" :total="total" @pageChange="pageChange" @pageSizeChange="pageSizeChange" />

    <el-dialog title="记录详情" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <pre class="pre-json">{{ replyRecord }}</pre>
    </el-dialog>
  </div>
</template>

<script>
import ReplyTableSearch from '@/components/ReplyTableSearch'
import Pagination from '@/components/Pagination'
import { getReplyRecords } from '@/api/replyRecord'

export default {
  data() {
    return {
      listLoading: true,
      list: [],
      page: 1,
      pageSize: 20,
      total: 0,
      dialogVisible: false,
      replyRecord: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(searchParams = {}) {
      this.listLoading = true
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        ...searchParams
      }
      getReplyRecords(params).then(res => {
        const { rows, page, pageSize, total } = res.data
        this.list = rows
        this.page = page
        this.pageSize = pageSize
        this.total = total
      }).finally(() => {
        this.listLoading = false
      })
    },
    pageChange(val) {
      this.page = val
      this.fetchData()
    },
    pageSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    previewReplyRecord(item) {
      this.replyRecord = item
      this.dialogVisible = true
    }
  },
  components: { ReplyTableSearch, Pagination }
}
</script>

<style lang="scss" scoped>
.pre-json {
  line-height: 22px;
  white-space: pre-wrap;
}
</style>

