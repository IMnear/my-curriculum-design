<template>
  <div>
    {{msg}}
    <v-map></v-map>
    <v-echarts></v-echarts>
    <v-time></v-time>
    <button @click="initWebpack">开始websocket</button>
  </div>
</template>

<script>
import map from '@/components/baiduMap.vue'
import echarts from '@/components/myEcharts.vue'
import time from '@/components/time.vue'
export default {
  name: 'my',
  data () {
    return {
      msg: '我的'
    }
  },
  components: {
    'v-map': map,
    'v-echarts': echarts,
    'v-time': time
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
    function getLocation () {
      if (navigator.geolocation) {
        console.log('进入')
        navigator.geolocation.getCurrentPosition(showPosition)
      } else { console.log('Geolocation is not supported by this browser.') }
    }
    function showPosition (position) {
      console.log('ok')
      console.log(position.coords.latitude, position.coords.longitude)
    }
    getLocation()
  },
  methods: {
    doHeader () {
      console.log('这是头')
    },
    initWebpack () { // 初始化websocket
      const wsuri = 'ws://localhost:4000'
      this.websock = new WebSocket(wsuri)
      // 这里面的this都指向vue
      this.websock.onopen = this.websocketopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
      this.websock.onerror = this.websocketerror
    },
    websocketopen () { // 打开
      console.log('WebSocket连接成功')
    },
    websocketonmessage (e) { // 数据接收
      console.log(e)
      this.productinfos = JSON.parse(e.data)
    },
    websocketclose () { // 关闭
      console.log('WebSocket关闭')
    },
    websocketerror () { // 失败
      console.log('WebSocket连接失败')
    }
  }
}
</script>

<style scoped>
</style>
