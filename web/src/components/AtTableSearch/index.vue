<template>
  <el-form class="at-form" :inline="true" :model="searchForm" @submit.native.prevent>
    <div>
      <el-form-item label="内容">
        <el-input size="mini" v-model="searchForm.content" placeholder="请输入内容" clearable />
      </el-form-item>
      <el-form-item label="发送者昵称">
        <el-input size="mini" v-model="searchForm.senderNick" placeholder="请输入发送者昵称" clearable />
      </el-form-item>
      <el-form-item label="@ 时间">
        <el-date-picker size="mini" v-model="searchForm.atTime" type="datetimerange" start-placeholder="开始时间" clearable
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
  name: 'AtTableSearch',
  data() {
    return {
      searchForm: {
        content: '',
        senderNick: '',
        atTime: ''
      }
    }
  },
  methods: {
    handleChange () {
      this.onSearch()
    },
    onReset() {
      this.searchForm = {
        content: '',
        senderNick: '',
        atTime: []
      }
      this.$emit('fetchData')
    },
    onSearch() {
      let { content, senderNick, atTime } = this.searchForm
      !atTime && (atTime = ['', ''])
      const startDate = atTime[0]
      const endDate = atTime[1]
      this.$emit('fetchData', { content, senderNick, startDate, endDate })
    }
  }
}
</script>

<style lang="scss" scoped>
.at-form {
  display: flex;
  justify-content: space-between;
}
</style>
