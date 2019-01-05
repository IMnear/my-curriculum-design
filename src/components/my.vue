<template>
  <div>
    {{msg}}
    <v-map></v-map>
    <v-echarts></v-echarts>
    <v-time></v-time>
    <el-form :label-position="'left'"
             label-width="80px"
             :model="userInfo">
      <el-form-item label="名字">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="userInfo.sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="userInfo.age"></el-input>
      </el-form-item>
    </el-form>
    <button @click="updatamy">确认更新</button>
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
      msg: '我的',
      userInfo: {}
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
    let myneedid = JSON.parse(localStorage.userInfo).id
    this.$api.post(
      '/users/getUserById',
      {
        'id': myneedid
      },
      response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          this.$data.userInfo = response.data[0]
          console.log(this.$data.userInfo, '个人信息')
        } else {
          console.log(response.message)
        }
      }
    )
  },
  methods: {
    doHeader () {
      console.log('这是头')
    },
    updatamy () {
      this.$api.post(
        '/users/update',
        this.$data.userInfo,
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            if (response.data.msg === 'succeed') {
              this.$api.post(
                '/users/getUserById',
                {
                  'id': this.$data.userInfo.id
                },
                response => {
                  if (response.status >= 200 && response.status < 300) {
                    console.log(response.data)
                    this.$data.userInfo = response.data[0]
                    console.log(this.$data.userInfo, '个人信息')
                    this.$message({
                      message: '恭喜您修改成功',
                      type: 'success'
                    })
                  } else {
                    console.log(response.message)
                  }
                }
              )
            }
          } else {
            console.log(response.message)
            this.$message.error('错了哦，这是一条错误消息')
          }
        }
      )
    }
  }
}
</script>

<style scoped>
</style>
