<template>
  <div>
    <h3>{{msg}}</h3>
    <el-input v-model="account" placeholder="id"></el-input>
    <el-input  v-model="password" placeholder="用户名"></el-input>
    <el-button type="success" @click="doLogin">登录</el-button>
    <el-button type="success" @click="doReg">注册</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: '登录',
      account: null,
      password: null
    }
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
  },
  methods: {
    doLogin () {
      this.$api.post(
        '/users/login',
        {
          'username': this.$data.account,
          'password': this.$data.password
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            if (!response.data.isLogin) {
              this.$notifye.error({
                title: '错误',
                message: '登陆失败'
              })
            } else {
              localStorage.setItem('token', response.data.result.token)
              console.log('登录', this.account, localStorage.token)
              console.log('跳转理由', this.$route.query.redirect)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push({name: 'home'})
              }
            }
          } else {
            console.log(response.message)
          }
        }
      )
    },
    doReg () {
      this.$api.post(
        '/users/reg',
        {
          'username': this.$data.account,
          'password': this.$data.password
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            if (!response.data.isLogin) {
              this.$notifye.error({
                title: '错误',
                message: '注册失败'
              })
            } else {
              this.$notify({
                title: '成功',
                message: '注册成功',
                type: 'success'
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

</style>
