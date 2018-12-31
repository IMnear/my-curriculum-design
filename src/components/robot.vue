<template>
  <div class="all">
    <div class="input-from">
      <el-input v-model='isay'
                placeholder='请输入你要询问神奇的太极的话'></el-input>
      <el-button type="primary"
                 @click='robot'>发送</el-button>
    </div>
    <div class="robot-say">
      <div>{{robotsaytext}}</div>
    </div>
    <div class="square">
      <div class="rect rect_one">
        <div class="inner_circle rect_one_one">
          <div class="dot rect_one_two"></div>
        </div>
      </div>
      <div class="rect rect_two">
        <div class="inner_circle rect_two_one">
          <div class="dot rect_two_two"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
.square {
  padding: 0;
  margin: 0;
  width: 400px;
  height: 400px;
  position: relative;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  animation: rotate infinite linear 5s;
  margin: 10% auto;
  -webkit-animation: rotate infinite linear 5s;
  margin: 10% auto;
  -moz-animation: rotate infinite linear 5s;
  margin: 10% auto;
}

.rect {
  width: 400px;
  height: 200px;
  position: relative;
  border: 1px #d2d2d2 solid;
  border-bottom: none;
}

.inner_circle {
  width: 200px;
  height: 200px;
  border-radius: 200px;
  position: absolute;
  z-index: 1;
}

.dot {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
}

.rect_one {
  border-radius: 200px 200px 0 0;
  background: white;
}

.rect_one_one {
  bottom: -100px;
  left: 0;
  background: black;
}

.rect_one_two {
  background: white;
}

.rect_two {
  border-radius: 0 0 200px 200px;
  background: black;
}

.rect_two_one {
  bottom: 100px;
  right: 0;
  background: white;
}

.rect_two_two {
  background: black;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
</style>
