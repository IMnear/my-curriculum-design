<template>
  <div>
    <ul class="honeycomb"
        lang="es">
      <li class="honeycomb-cell"
          v-for="x in list"
          v-bind:key="x.index"
          @click="showmeneed (x,'hospital')">
        <img class="honeycomb-cell__image"
             :src="x.img">
        <div class="honeycomb-cell__title">{{x.name}}{{x.address||x.office}}<p>{{x.abstract}}</p>
        </div>
      </li>
      <li class="honeycomb-cell honeycomb__placeholder"></li>
    </ul>
  </div>
</template>

<script>
import time from '@/components/time'
export default {
  name: 'registration',
  data () {
    return {
      msg: '挂号',
      list: [],
      mysonsay: '',
      postAddress: ''
    }
  },
  components: {
    'v-time': time
  },
  created: function () {
    if (!localStorage.address) {
      this.$api.get('http://pv.sohu.com/cityjson', {}, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          let strobj = response.data.split('=')[1]
          this.$data.postAddress = JSON.parse(strobj.split(';')[0]).cname
        } else {
          console.log(response)
          // 请求失败，response为失败信息
        }
      })
    } else {
      this.$data.postAddress = localStorage.address
    }
  },
  mounted () {
    // 地址操作
    console.log(this.$data.postAddress)
    this.$api.post(
      '/hospital/gethospitalBy',
      {
        'type': 'address',
        'value': this.$data.postAddress
      },
      response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          this.$data.list = response.data.hospital
          if (this.$data.list === undefined || this.$data.list.length === 0) {
            this.$message({
              message: '查询内容为空',
              center: true
            })
          }
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
    showmeneed (what, type) {
      console.log(what)
      let postStr
      let postObj
      switch (type) {
        case 'hospital':
          postStr = '/doctor/getDoctorBy'
          postObj = {
            type: 'hsid',
            value: what.hsid
          }
          break
        case 2:
          postStr = what
          break
        default:
          postStr = what
      }
      this.$api.post(
        postStr,
        postObj,
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            this.$data.list = response.data.doctor
            console.log(this.$data.list)
            if (this.$data.list === undefined || this.$data.list.length === 0) {
              this.$message({
                message: '查询内容为空',
                center: true
              })
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
@import "../assets/css/registration-style.css";
</style>
