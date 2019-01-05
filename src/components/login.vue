<template>
  <div>
    <div class="cotn_principal">
      <div class="cont_centrar">
        <div class="cont_login">
          <div class="cont_info_log_sign_up">
            <div class="col_md_login">
              <div class="cont_ba_opcitiy">
                <h2>登录</h2>
                <p>如果您有账号请点击这里！</p>
                <button class="btn_login"
                        v-on:click="cambiar_login()">登录</button>
              </div>
            </div>
            <div class="col_md_sign_up">
              <div class="cont_ba_opcitiy">
                <h2>注册</h2>
                <p>如果您没有账号请点击这里！</p>
                <button class="btn_sign_up"
                        v-on:click="cambiar_sign_up()">注册</button>
              </div>
            </div>
          </div>
          <div class="cont_back_info">
            <div class="cont_img_back_grey"> <img src="../assets/img/hospital.jpg"
                   alt="" /> </div>
          </div>
          <div class="cont_forms">
            <div class="cont_img_back_"> <img src="../assets/img/hospital.jpg"
                   alt="" /> </div>
            <div class="cont_form_login"> <a href="#"
                 v-on:click="ocultar_login_sign_up()"><i class="material-icons">&#xE5C4;</i></a>
              <h2>登录</h2>
              <input type="text"
                     v-model="account"
                     placeholder="用户名" />
              <!-- 以前是电子邮件 -->
              <input type="password"
                     v-model="password"
                     placeholder="密码" />
              <button class="btn_login"
                      @click="doLogin">登录</button>
            </div>
            <div class="cont_form_sign_up"> <a href="#"
                 v-on:click="ocultar_login_sign_up()"><i class="material-icons">&#xE5C4;</i></a>
              <h2>注册</h2>
              <input type="text"
                     v-model="account"
                     placeholder="用户名" />
              <input type="password"
                     placeholder="密码" />
              <input type="password"
                     v-model="password"
                     placeholder="确认密码" />
              <button class="btn_sign_up"
                      @click="doReg">注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  mounted: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
    this.cambiar_login()
    this.cambiar_sign_up()
    this.ocultar_login_sign_up()
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
  },
  methods: {
    // 效果方法
    cambiar_login () {
      document.querySelector('.cont_forms').className = 'cont_forms cont_forms_active_login'
      document.querySelector('.cont_form_login').style.display = 'block'
      document.querySelector('.cont_form_sign_up').style.opacity = '0'

      setTimeout(function () { document.querySelector('.cont_form_login').style.opacity = '1' }, 400)

      setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = 'none'
      }, 200)
    },
    cambiar_sign_up (at) {
      document.querySelector('.cont_forms').className = 'cont_forms cont_forms_active_sign_up'
      document.querySelector('.cont_form_sign_up').style.display = 'block'
      document.querySelector('.cont_form_login').style.opacity = '0'

      setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.opacity = '1'
      }, 100)

      setTimeout(function () {
        document.querySelector('.cont_form_login').style.display = 'none'
      }, 400)
    },
    ocultar_login_sign_up () {
      document.querySelector('.cont_forms').className = 'cont_forms'
      document.querySelector('.cont_form_sign_up').style.opacity = '0'
      document.querySelector('.cont_form_login').style.opacity = '0'

      setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = 'none'
        document.querySelector('.cont_form_login').style.display = 'none'
      }, 500)
    },
    // 效果方法
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
              localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
              if (localStorage.token) {
                this.$api.get('/users/get', {}, response => {
                  if (response.status >= 200 && response.status < 300) {
                    console.log(response.data)
                    // 请求成功，response为成功信息参数
                  } else {
                    console.log(response.message)
                    // 请求失败，response为失败信息
                  }
                })
              }
              console.log('登录', this.account, localStorage.token)
              console.log('跳转理由', this.$route.query.redirect)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push({ name: 'home' })
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
            if (!response.data.isreg) {
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
@import "../assets/css/login-style.css";
</style>
