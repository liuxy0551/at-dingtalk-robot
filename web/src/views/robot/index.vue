<template>
  <div class="app-container">
    <div class="add-btn">
      <el-button type="primary" size="mini" @click="dialogVisible = true">新增</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ (page - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="机器人名称" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.name || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="AppKey" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.appKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推送地址" align="center" show-overflow-tooltip>
        <template slot="header" slot-scope="scope">
          <div class="row-flex">
            推送地址
            <el-tooltip class="item" effect="dark" content="POST 请求，参数与钉钉推送来的格式一致" placement="top-end">
              <i class="el-icon-question help-icon"></i>
            </el-tooltip>
          </div>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.apiUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button class="danger-text" type="text" size="small" @click="deleteRobot(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="editRobot(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :page="page" :pageSize="pageSize" :total="total" @pageChange="pageChange" @pageSizeChange="pageSizeChange" />

    <el-dialog :title="`${ robotForm.robotId ? '编辑' : '新增' }机器人`" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="handleClosed">
      <el-form class="at-form" :model="robotForm" :rules="rules" label-width="100px" ref="robotFormRef">
        <el-form-item label="机器人名称" prop="name">
          <el-input v-model="robotForm.name" placeholder="请输入机器人名称" maxlength="100" />
        </el-form-item>
        <el-form-item label="AppKey" prop="appKey">
          <el-input v-model="robotForm.appKey" placeholder="请输入 AppKey" maxlength="200" />
        </el-form-item>
        <el-form-item label="AppSecret" prop="appSecret">
          <el-input v-model="robotForm.appSecret" placeholder="请输入 AppSecret" maxlength="100" />
        </el-form-item>
        <el-form-item label="推送地址" prop="apiUrl">
          <div class="row-flex">
            <el-input v-model="robotForm.apiUrl" placeholder="验证消息来自钉钉后推送数据到该地址" maxlength="512" />
            <el-tooltip class="item" effect="dark" content="POST 请求，参数与钉钉推送来的格式一致" placement="top-end">
              <i class="el-icon-question help-icon"></i>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" :rows="4" v-model="robotForm.note" placeholder="请输入备注" maxlength="512" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="submitRobotForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getRobots, createRobot, updateRobot, deleteRobot } from '@/api/robot'

export default {
  data() {
    return {
      listLoading: true,
      list: [],
      page: 1,
      pageSize: 20,
      total: 0,
      dialogVisible: false,
      createLoading: false,
      robotForm: {
        name: '',
        appKey: '',
        appSecret: '',
        apiUrl: '',
        note: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入机器人名称', trigger: 'blur' }
        ],
        appKey: [
          { required: true, message: '请输入 AppKey', trigger: 'blur' }
        ],
        appSecret: [
          { required: true, message: '请输入 AppSecret', trigger: 'blur' }
        ],
        apiUrl: [
          { required: true, message: '请输入 AppSecret', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dialogVisible(nv, ov) {
      !nv && this.$refs.robotFormRef && this.$refs.robotFormRef.resetFields()
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
      getRobots(params).then(res => {
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
    submitRobotForm() {
      this.$refs.robotFormRef.validate().then(() => {
        this.createLoading = true
        if (this.robotForm.robotId) { // 编辑
          updateRobot(this.robotForm).then(res => {
            this.fetchData()
            this.$message.success({ message: '保存成功!' });
            this.dialogVisible = false
          }).finally(() => {
            this.createLoading = false
          })
        } else { // 新增
          createRobot(this.robotForm).then(res => {
            this.fetchData()
            this.$message.success({ message: '保存成功!' });
            this.dialogVisible = false
          }).finally(() => {
            this.createLoading = false
          })
        }
      })
    },
    deleteRobot(item) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRobot({ robotId: item.robotId }).then(() => {
          this.fetchData()
          this.$message.success({ message: '删除成功!' });
        })
      })
    },
    editRobot(item) {
      this.robotForm = { ...item }
      this.dialogVisible = true
    },
    handleClosed() {
      this.robotForm = {
        name: '',
        appKey: '',
        appSecret: '',
        apiUrl: '',
        note: ''
      }
    }
  },
  components: { Pagination }
}
</script>

<style lang="scss" scoped>
.add-btn {
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.danger-text {
  color: #fe6164;
}
.at-form {
  width: 80%;
  margin: 0 auto;
}
</style>
