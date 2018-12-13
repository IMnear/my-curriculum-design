<template>
  <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="doAxios">测试</el-button>
      </div>
    </el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content bg-purple-light">
        <el-button type="primary" @click="doSay">语音</el-button>
      </div>
    </el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="goImgPerson">跳转</el-button>
      </div>
    </el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content bg-purple-light"></div>
    </el-col>
  </el-row>
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
        '/users/add',
        {
          'id': 312,
          'name': 'zhangruiwen'
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
          'id': 2222
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
    }

  }
}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
