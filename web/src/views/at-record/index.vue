<template>
  <div class="app-container">
    <AtTableSearch @fetchData="fetchData" />

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column fixed="left" align="center" label="序号" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewAtRecord(scope.row)">{{ (page - 1) * pageSize + scope.$index + 1 }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="机器人名称" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.robotName || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="群聊名称" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.conversationTitle || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center" min-width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.content || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送者昵称" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderNick }}
        </template>
      </el-table-column>
      <el-table-column label="@ 时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.createAt }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="详情" align="center" width="160">
        <template slot-scope="scope">
          <el-popconfirm title="重发会将内容再次发送给钉钉机器人，并将收到机器人的回复，确认？">
            <el-button size="small" slot="reference" disabled @click="reSend(scope.row)">模拟重发</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :page="page" :pageSize="pageSize" :total="total" @pageChange="pageChange" @pageSizeChange="pageSizeChange" />

    <el-dialog title="记录详情" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <pre class="pre-json">{{ atRecord }}</pre>
    </el-dialog>
  </div>
</template>

<script>
import AtTableSearch from '@/components/AtTableSearch'
import Pagination from '@/components/Pagination'
import { getAtRecords } from '@/api/atRecord'

export default {
  data() {
    return {
      listLoading: true,
      list: [],
      page: 1,
      pageSize: 20,
      total: 0,
      dialogVisible: false,
      atRecord: null
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
      getAtRecords(params).then(res => {
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
    previewAtRecord(item) {
      this.atRecord = item
      this.dialogVisible = true
    },
    reSend(item) {
      // this.atRecord = item
      // this.dialogVisible = true
    }
  },
  components: { AtTableSearch, Pagination }
}
</script>

<style lang="scss" scoped>
.pre-json {
  line-height: 22px;
  white-space: pre-wrap;
}
</style>

