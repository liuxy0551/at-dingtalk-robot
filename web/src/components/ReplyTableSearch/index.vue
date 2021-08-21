<template>
  <el-form class="reply-form" :inline="true" :model="searchForm" @submit.native.prevent>
    <div>
      <el-form-item label="消息">
        <el-input size="mini" v-model="searchForm.msg" placeholder="请输入消息内容，支持模糊搜索" clearable />
      </el-form-item>
      <el-form-item label="回复时间">
        <el-date-picker size="mini" v-model="searchForm.replyTime" type="datetimerange" start-placeholder="开始时间" clearable
          end-placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['09:00:00', '18:00:00']"
          @change="handleChange" />
      </el-form-item>
    </div>
    <div>
      <el-form-item>
        <el-button size="mini" @click="onReset">重置</el-button>
        <el-button type="primary" size="mini" native-type="submit" @click="onSearch">查询</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'ReplyTableSearch',
  data() {
    return {
      searchForm: {
        msg: '',
        replyTime: ''
      }
    }
  },
  methods: {
    handleChange (replyTime = ['', '']) {
      this.onSearch()
    },
    onReset() {
      this.searchForm = {
        msg: '',
        replyTime: []
      }
      this.$emit('fetchData')
    },
    onSearch() {
      let { msg, replyTime } = this.searchForm
      !replyTime && (replyTime = ['', ''])
      const startDate = replyTime[0]
      const endDate = replyTime[1]
      this.$emit('fetchData', { msg, startDate, endDate })
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-form {
  display: flex;
  justify-content: space-between;
}
</style>
