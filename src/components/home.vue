<template>
  <div class="all">
    <div class="lefter" @click="doSay">
      <div class="text" >智能挂号(语音/人脸/图片)</div>
    </div>
    <div class="left" @click="doAxios">
      <div class="text" >智能问询(机器人图灵)</div>
    </div>
    <div class="center">
      <div class="explainer">
        <span>挂号</span>
      </div>
      <div class="text" @click="goRegistration">快速挂号</div>
    </div>
    <div class="right" @click="goImgPerson">
      <div class="text" >我的个人信息界面</div>
    </div>
    <div class="righter">
      <div class="text">医疗新闻推荐(node爬虫)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '开始'
    }
  },
  methods: {
    doAxios () {
      this.$api.get('/users/get', {}, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          // 请求成功，response为成功信息参数
        } else {
          console.log(response.message)
          // 请求失败，response为失败信息
        }
      })
      this.$api.post(
        '/users/reg',
        {
          'username': 312,
          'password': 11111
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
          } else {
            console.log(response.message)
          }
        }
      )
      this.$api.delete(
        '/users/delete',
        {
          'id': 7
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
          } else {
            console.log(response.message)
          }
        }
      )
    },
    doSay () {
      const msg = new SpeechSynthesisUtterance('我叫文')
      window.speechSynthesis.speak(msg)
    },
    goImgPerson () {
      this.$router.push({name: 'imgPerson', params: { userId: 'wen' }})
    },
    goRegistration () {
      this.$router.push({name: 'registration', params: { userId: 'wen' }})
    }

  }
}
</script>

<style>
body {
  font-family: "Raleway", sans-serif;
  background-image: radial-gradient(circle at center, #899dc4, #495d84);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(ellipse at bottom, #1b2735, #090a0f);
  font-weight: 300;
}

.all {
  display: flex;
  -webkit-perspective: 10px;
  perspective: 10px;
  -webkit-transform: perspective(300px) rotateX(20deg);
  transform: perspective(300px) rotateX(20deg);
  will-change: perspective;
  -webkit-perspective-origin: center center;
  perspective-origin: center center;
  transition: all 1.3s ease-out;
  justify-content: center;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.all:hover {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  transition: all 1.3s ease-in;
  -webkit-transform: perspective(10000px) rotateX(0deg);
  transform: perspective(10000px) rotateX(0deg);
}
.all:hover .text {
  opacity: 1;
}
.all:hover > div {
  opacity: 1;
  transition-delay: 0s;
}
.all:hover .explainer {
  opacity: 0;
}

.left,
.center,
.right,
.lefter,
.righter {
  width: 200px;
  height: 150px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  border-radius: 10px;
  border: 1px solid #fff;
  box-shadow: 0 0 20px 5px rgba(100, 100, 255, 0.4);
  opacity: 0;
  transition: all 0.3s ease;
  transition-delay: 1s;
  position: relative;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #58d;
  cursor: pointer;
  background-blend-mode: color-burn;
}
.left:hover,
.center:hover,
.right:hover,
.lefter:hover,
.righter:hover {
  box-shadow: 0 0 30px 10px rgba(100, 100, 255, 0.6);
  background-color: #ccf;
}

.text {
  -webkit-transform: translateY(30px);
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.3s ease;
  bottom: 0;
  left: 5px;
  position: absolute;
  will-change: transform;
  color: #fff;
  text-shadow: 0 0 5px rgba(100, 100, 255, 0.6);
  text-align: center
}

.lefter {
  -webkit-transform: translateX(-60px) translateZ(-50px) rotateY(-10deg);
  transform: translateX(-60px) translateZ(-50px) rotateY(-10deg);
  background-image: url(../assets/img/organization-512.png);
}

.left {
  -webkit-transform: translateX(-30px) translateZ(-25px) rotateY(-5deg);
  transform: translateX(-30px) translateZ(-25px) rotateY(-5deg);
  background-image: url(../assets/img/creative_draw-512.png);
}

.center {
  opacity: 1;
  background-image: url(../assets/img/app_window-512.png);
}

.right {
  -webkit-transform: translateX(30px) translateZ(-25px) rotateY(5deg);
  transform: translateX(30px) translateZ(-25px) rotateY(5deg);
  background-image: url(../assets/img/cloud_weather-512.png);
}

.righter {
  -webkit-transform: translateX(60px) translateZ(-50px) rotateY(10deg);
  transform: translateX(60px) translateZ(-50px) rotateY(10deg);
  background-image: url(../assets/img/search-512.png);
}

.explainer {
  font-weight: 300;
  font-size: 2rem;
  color: #fff;
  transition: all 0.6s ease;
  width: 100%;
  height: 100%;
  background-color: #303050;
  background-image: radial-gradient(circle at center top, #cce, #33a);
  border-radius: 10px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.ref {
  background-color: #000;
  background-image: linear-gradient(to bottom, #d80, #c00);
  border-radius: 3px;
  padding: 7px 10px;
  position: absolute;
  font-size: 16px;
  bottom: 10px;
  right: 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}
.ref::first-letter {
  font-size: 12px;
}
</style>
