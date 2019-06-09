<template>
  <div class="all">
    <div class="input-from">
      <el-input v-model='isay'
                placeholder='请输入你要询问的话'></el-input>
      <el-button type="primary"
                 @click='robot'>发送</el-button>
    </div>
    <div class="robot-say">
      <div>{{robotsaytext}}</div>
    </div>
    <v-world></v-world>
  </div>
</template>

<script>
import world from '@/components/myEcharts-world.vue'
export default {
  name: 'robot',
  data () {
    return {
      msg: '挂号',
      isay: '',
      robotsay: true,
      robotsaytext: '看看回答了你啥？'
    }
  },
  components: {
    'v-world': world
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
    // 获取地理位置
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition, showError)
    // } else {

    // }
  },
  methods: {
    doHeader () {
      console.log('这是头')
    },
    robot () {
      var url = this.robotapi
      var that = this
      console.log(url, '接口地址')
      this.$axios({ // this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
        method: 'post',
        url: url,
        data: {
          'reqType': 0,
          'perception': {
            'inputText': {
              'text': that.$data.isay
            },
            'inputImage': {
              'url': 'imageUrl'
            },
            'selfInfo': {
              'location': {
                'city': '北京',
                'province': '北京',
                'street': '信息路'
              }
            }
          },
          'userInfo': {
            'apiKey': 'ed548a3b1a344b37b3d0035460e04e23',
            'userId': '1'
          }
        }
      }).then(function (res) {
        console.log(res)
        console.log(res.data.results)
        console.log(res.data.results[0].values.text, that.$data.robotsay)
        if (that.$data.robotsay) {
          const msg = new SpeechSynthesisUtterance(res.data.results[0].values.text)
          that.$data.robotsaytext = res.data.results[0].values.text
          window.speechSynthesis.speak(msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.input-from {
  display: flex;
  width: 40%;
  justify-content: space-around;
}
.robot-say {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 40px;
  text-align: center;
  font-family: DFKai-SB;
  font-weight: bold;
  font-size: 18px;
  color: white;
}
</style>
