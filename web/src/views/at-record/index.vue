<template>
  <div class="app-container">
    <AtTableSearch @fetchData="fetchData" />

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column fixed="left" align="center" label="序号" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewAtRecord(scope.row)">{{ (page - 1) * pageSize + scope.$index + 1 }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="机器人名称" align="center" width="160" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.robotName || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="群聊名称" align="center" width="160" show-overflow-tooltip>
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
      <el-table-column label="会话是否过期" width="140" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isExpired ? 'info' : 'success'">{{ scope.row.isExpired ? '已过期' : '未过期' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="@ 时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.createAt }}
        </template>
      </el-table-column>
      <el-table-column label="会话过期时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.sessionWebhookExpiredTime }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="详情" align="center" width="160">
        <template slot="header" slot-scope="scope">
          <div class="row-flex">
            详情
            <el-tooltip class="item" effect="dark" content="已过期的会话不能进行模拟重发" placement="top-end">
              <i class="el-icon-question help-icon"></i>
            </el-tooltip>
          </div>
        </template>
        <template slot-scope="scope">
          <el-popconfirm title="重发会将内容再次发送给钉钉机器人，并将收到机器人的回复，确认？" @onConfirm="reSend(scope.row)">
            <el-button size="mini" :disabled="scope.row.isExpired" slot="reference">模拟重发</el-button>
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
import { getAtRecords, reSendAt } from '@/api/atRecord'
import { Message } from 'element-ui'

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
      const { content, senderStaffId, conversationTitle, sessionWebhook, senderNick, senderId, isDev, appKey } = item
      const params = {
        text: {
          content
        },
        senderStaffId,
        conversationTitle,
        sessionWebhook,
        senderNick,
        senderId,
        isDev,
        appKey
      }
      reSendAt(params).then(({ data }) => {
        const { result = { errcode: '', errmsg: '' } } = data
        if (result.errcode === 0) return Message.success('模拟重发成功')
        Message.error(`发送失败 ${ result.errmsg }`)
      })
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

