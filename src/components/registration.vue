<template>
  <div>
    <ul class="honeycomb"
        lang="es">
      <li class="honeycomb-cell"
          v-for="x in list"
          v-bind:key="x.index"
          @click="x.ysid?guahao(x):showmeneed (x)">
        <img class="honeycomb-cell__image"
             :src="x.img">
        <div class="honeycomb-cell__title">{{x.name}}{{x.address!=undefined?'('+x.address+')':'('+x.office+')'}})<p>{{x.abstract}}</p>
        </div>
      </li>
      <li class="honeycomb-cell honeycomb__placeholder"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'registration',
  data () {
    return {
      msg: '挂号',
      list: [],
      mysonsay: '',
      postAddress: '',
      userInfo: {}
    }
  },
  created: function () {
    console.log(localStorage.userInfo)
    var userInfo = JSON.parse(localStorage.userInfo)
    this.$data.userInfo = userInfo
    console.log(userInfo, '用户对象')
    if (!userInfo.adress) {
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
      this.$data.postAddress = userInfo.adress
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
    guahao (doctor) {
      console.log('医生', doctor)
      this.$api.post(
        '/Overview/add',
        {
          ysid: doctor.ysid,
          userid: this.$data.userInfo.id,
          time: new Date()
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            if (response.data.msg === 'succeed') {
              this.$confirm('恭喜您挂号成功', '提示', {
                confirmButtonText: '进入个人中心',
                cancelButtonText: '取消',
                center: true
              }).then(() => {
                // 个人信息界面
                this.$router.push({ name: 'my' })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
            }
          } else {
            console.log(response.message)
          }
        }
      )
    },
    showmeneed (what) {
      console.log(what)
      this.$api.post(
        '/doctor/getDoctorBy',
        {
          type: 'hsid',
          value: what.hsid
        },
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
