<template>
  <div id="baiduMap">
    <div id="allmap"
         ref="allmap"></div>
  </div>
</template>

<script>
import BMap from 'BMap'
export default {
  name: 'baiduMap',
  methods: {
    map () {
      let map = new BMap.Map(this.$refs.allmap)// 创建Map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 9)// 初始化地图,设置中心点坐标和地图级别
      // map.addControl(new BMap.MapTypeControl({// 添加地图类型控件
      //   mapTypes: [
      //     'BMAP_NORMAL_MAP',
      //     'BMAP_HYBRID_MAP'
      //   ] }))
      map.setCurrentCity('北京')// 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
    }

  },
  mounted () {
    this.map()
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#allmap {
  height: 500px;
  overflow: hidden;
}
</style>
