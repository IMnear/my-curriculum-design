<template>
  <div id="myChart"
       :style="{width: '600px', height: '600px'}"></div>
</template>

<script>
export default {
  name: 'myEcharts',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      var option = {
        parallelAxis: [
          { dim: 0, name: '价格' },
          { dim: 1,
            name: 'Score',
            type: 'category',
            data: ['牙科', '眼科', '内科', '外科'] },
          {
            dim: 2,
            name: 'Score',
            type: 'category',
            data: ['张瑞文', '张籽沐', '皮蛋王', '葫芦娃']
          }
        ],
        series: {
          type: 'parallel',
          lineStyle: {
            width: 4
          },
          data: [
            [80, '牙科', '张瑞文'],
            [9.99, '眼科', '皮蛋王'],
            [20, '外科', '张籽沐']
          ]
        }
      }

      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>

<style>
</style>
