<template>
  <div class="cont s--inactive">
    <!-- cont inner start -->
    <div class="cont__inner">
      <!-- el start -->
      <div class="el">
        <div class="el__overflow">
          <div class="el__inner">
            <div class="el__bg"></div>
            <div class="el__preview-cont"
                 @click="goTowhere ('imgPerson')">
              <h2 class="el__heading">智能挂号(语音/人脸/图片)</h2>
            </div>
            <div class="el__content">
              <div class="el__text">Smart registered</div>
              <div class="el__close-btn"
                   @click="closeMyshow('imgPerson')"></div>
              <div class="showrouter"
                   v-if="imgPerson">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
        <div class="el__index">
          <div class="el__index-back">1</div>
          <div class="el__index-front">
            <div class="el__index-overlay"
                 data-index="1">1</div>
          </div>
        </div>
      </div>
      <!-- el end -->
      <!-- el start -->
      <div class="el">
        <div class="el__overflow">
          <div class="el__inner">
            <div class="el__bg"></div>
            <div class="el__preview-cont"
                 @click="goTowhere ('robot')">
              <h2 class="el__heading">智能问询(机器人图灵)</h2>
            </div>
            <div class="el__content">
              <div class="el__text">Robot</div>
              <div class="el__close-btn"
                   @click="closeMyshow('robot')"></div>
              <div class="showrouter"
                   v-if="robot">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
        <div class="el__index">
          <div class="el__index-back">2</div>
          <div class="el__index-front">
            <div class="el__index-overlay"
                 data-index="2">2</div>
          </div>
        </div>
      </div>
      <!-- el end -->
      <!-- el start -->
      <div class="el">
        <div class="el__overflow">
          <div class="el__inner">
            <div class="el__bg"></div>
            <div class="el__preview-cont"
                 @click="goTowhere ('registration')">
              <h2 class="el__heading">快速挂号</h2>
            </div>
            <div class="el__content">
              <div class="el__text">Quick to register</div>
              <div class="el__close-btn"
                   @click="closeMyshow('registration')"></div>
              <div class="showrouter"
                   v-if="registration">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
        <div class="el__index">
          <div class="el__index-back">3</div>
          <div class="el__index-front">
            <div class="el__index-overlay"
                 data-index="3">3</div>
          </div>
        </div>
      </div>
      <!-- el end -->
      <!-- el start -->
      <div class="el">
        <div class="el__overflow">
          <div class="el__inner">
            <div class="el__bg"></div>
            <div class="el__preview-cont"
                 @click="goTowhere ('my')">
              <h2 class="el__heading">我的个人信息界面</h2>
            </div>
            <div class="el__content">
              <div class="el__text">Me</div>
              <div class="el__close-btn"
                   @click="closeMyshow('my')"></div>
              <div class="showrouter"
                   v-if="my">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
        <div class="el__index">
          <div class="el__index-back">4</div>
          <div class="el__index-front">
            <div class="el__index-overlay"
                 data-index="4">4</div>
          </div>
        </div>
      </div>
      <!-- el end -->
      <!-- el start -->
      <div class="el">
        <div class="el__overflow">
          <div class="el__inner">
            <div class="el__bg"></div>
            <div class="el__preview-cont"
                 @click="goTowhere ('news')">
              <h2 class="el__heading">医疗新闻推荐(node爬虫)</h2>
            </div>
            <div class="el__content">
              <div class="el__text">News</div>
              <div class="el__close-btn"
                   @click="closeMyshow('news')"></div>
              <div class="showrouter"
                   v-if='news'>
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
        <div class="el__index">
          <div class="el__index-back">5</div>
          <div class="el__index-front">
            <div class="el__index-overlay"
                 data-index="5">5</div>
          </div>
        </div>
      </div>
      <!-- el end -->
    </div>
    <!-- cont inner end -->
  </div>
</template>

<script>
import time from '@/components/time'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '开始',
      robot: false,
      imgPerson: false,
      my: false,
      news: false,
      registration: false
    }
  },
  components: {
    'v-time': time
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
    goTowhere (where) {
      this.$data[where] = !this.$data[where]
      if (this.$data[where] === true) {
        this.$router.push({ name: where, params: { userId: 'wen', address: '杭州' } })
      }
    },
    closeMyshow (where) {
      this.$data[where] = !this.$data[where]
    }

  },
  mounted: function () {
    var $cont = document.querySelector('.cont')
    var $elsArr = [].slice.call(document.querySelectorAll('.el'))
    var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'))

    setTimeout(function () {
      $cont.classList.remove('s--inactive')
    }, 200)

    $elsArr.forEach(function ($el) {
      $el.addEventListener('click', function () {
        if (this.classList.contains('s--active')) return
        $cont.classList.add('s--el-active')
        this.classList.add('s--active')
      })
    })

    $closeBtnsArr.forEach(function ($btn) {
      $btn.addEventListener('click', function (e) {
        e.stopPropagation()
        $cont.classList.remove('s--el-active')
        document.querySelector('.el.s--active').classList.remove('s--active')
      })
    })
  }
}
</script>

<style scoped>
@import "../assets/css/home-style.css";
</style>
