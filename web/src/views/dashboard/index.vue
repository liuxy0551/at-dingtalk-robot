<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hi ! {{ name }} ~</div>
    <div class="dashboard-tip tip">at-dingtalk-robot<span style="padding: 0 20px 0 10px" v-if="version">v{{ version }}</span> 接收钉钉推送消息统一服务</div>
    <div class="dashboard-tip">在钉钉群里 @企业内部机器人 时接收钉钉推送的消息，验证中心</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../../package.json'

export default {
  name: 'Dashboard',
  data() {
    return {
      version: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.version = config.version
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-tip {
    font-size: 20px;
    padding-top: 30px;
    &.tip {
      padding-top: 50px;
    }
  }
}
</style>
