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
      this.$api.post(
        'http://openapi.tuling123.com/openapi/api/v2',
        {
          reqType: 0,
          perception: {
            inputText: {
              text: this.$data.isay
            },
            inputImage: {
              url: 'imageUrl'
            },
            selfInfo: {
              location: {
                city: '北京',
                province: '北京',
                street: '信息路'
              }
            }
          },
          userInfo: {
            apiKey: '069e90c4262243bf964ad95014371384',
            userId: '1'
          }
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data.results)
            console.log(response.data.results[0].values.text)
            if (this.$data.robotsay) {
              const msg = new SpeechSynthesisUtterance(response.data.results[0].values.text)
              this.$data.robotsaytext = response.data.results[0].values.text
              window.speechSynthesis.speak(msg)
            }
          } else {
            console.log(response.message)
          }
        }
      )
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
