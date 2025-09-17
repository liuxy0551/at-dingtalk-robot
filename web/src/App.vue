<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import config from '../../package.json'

export default {
  name: 'App',
  created() {
    window.console.log(
      `%cApp current version: v${config.version}`,
      'font-family: Cabin, Helvetica, Arial, sans-serif;text-align: left;font-size:32px;color:#B21212;'
    );
  }
}
</script>
