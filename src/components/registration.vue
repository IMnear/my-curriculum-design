<template>
  <div>
    <el-input v-model='isay' placeholder='请输入内容'></el-input>
    <el-button type='success' @click='robot'>发送</el-button>
  </div>
</template>

<script>
export default {
  name: 'registration',
  data () {
    return {
      msg: '挂号',
      isay: '',
      robotsay: true
    }
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
</style>
