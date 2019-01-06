<template>
  <div>
    {{msg}}
    <v-map></v-map>
    <v-echarts></v-echarts>
    <v-time></v-time>
    <v-from></v-from>
    <file-upload></file-upload>
  </div>
</template>

<script>
import map from '@/components/baiduMap.vue'
import echarts from '@/components/myEcharts.vue'
import time from '@/components/time.vue'
import myfrom from '@/components/from.vue'
export default {
  name: 'my',
  data () {
    return {
      msg: '我的',
      userInfo: {}
    }
  },
  components: {
    'v-map': map,
    'v-echarts': echarts,
    'v-time': time,
    'v-from': myfrom
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
  },
  methods: {
    doHeader () {
      console.log('这是头')
    }
  }
}
</script>

<style scoped>
</style>
