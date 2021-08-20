<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hi ! {{ name }} ~</div>
    <div class="dashboard-tip tip">at-dingtalk-robot 接收钉钉推送消息统一服务</div>
    <div class="dashboard-tip">用于在钉钉群里艾特企业内部机器人时，钉钉推送消息的校验</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
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
