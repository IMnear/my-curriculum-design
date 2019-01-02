<template>
  <div></div>
</template>

<script>
import time from '@/components/time'
export default {
  name: 'registration',
  data () {
    return {
      msg: '挂号',
      list: [{ id: 1, name: 'wo' }, { id: 2, name: 'ni' }],
      mysonsay: ''
    }
  },
  components: {
    'v-time': time
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
    var myStr = null
    if (!this.$route.params.address) {
      this.$api.get('http://pv.sohu.com/cityjson', {}, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          myStr = response.data.cname
          // 请求成功，response为成功信息参数
        } else {
          console.log(response.message)
          // 请求失败，response为失败信息
        }
      })
    } else {
      myStr = this.$route.params.address
    }
    console.log(myStr, '你的地址')
    // 地址操作
    this.$api.post(
      '/hospital/gethospitalBy',
      {
        'type': 'address',
        'value': myStr
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
  methods: {
    doHeader () {
      console.log('这是头')
    },
    fromson (enlargeAmount) {
      console.log(enlargeAmount)
      this.$data.mysonsay = enlargeAmount
    },
    showmeneed (what) {
      console.log(what)
      let postStr
      console.log(postStr)
      switch (what) {
        case 'hospital':
          postStr = what
          break
        case 2:
          postStr = what
          break
        default:
          postStr = what
      }
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
    }

  }
}
</script>

<style scoped>
@import "../assets/css/registration-style.css";
</style>
