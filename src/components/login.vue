<template>
  <div>
    <h3>{{msg}}</h3>
    <el-input v-model="account" placeholder="账号"></el-input>
    <el-input type="password" v-model="password" placeholder="密码"></el-input>
    <el-button type="success" @click="doPOST">登录</el-button>
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
    doPOST () {
      localStorage.setItem('token', this.account)
      console.log('登录', this.account, localStorage.token)
      console.log('跳转理由', this.$route.query.redirect)
      this.$router.push(this.$route.query.redirect)
    }
  }
}
</script>

<style scoped>

</style>
