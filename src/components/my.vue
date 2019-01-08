<template>
  <div>
    <v-nav></v-nav>
    <div class="all">
      <div class="me">
        <v-from></v-from>
      </div>
      <div class="echarts">
        <v-echarts></v-echarts>
      </div>
      <div class="time">
        <v-time></v-time>
      </div>
    </div>
    <v-map></v-map>
  </div>
</template>

<script>
import map from '@/components/baiduMap.vue'
import echarts from '@/components/myEcharts.vue'
import time from '@/components/time.vue'
import myfrom from '@/components/from.vue'
import nav from '@/components/nav.vue'

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
    'v-from': myfrom,
    'v-nav': nav
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
.all {
  background: whitesmoke;
  padding: 30px;
  display: flex;
}
.me {
  padding: 20px;
  flex-grow: 1; /* default 0 */
}
.time {
  flex-grow: 1; /* default 0 */
}
.echarts {
  flex-grow: 1; /* default 0 */
}
</style>
