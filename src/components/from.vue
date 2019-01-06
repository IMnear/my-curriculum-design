<template>
  <div class="myfrom">
    <el-form :label-position="'left'"
             label-width="80px"
             :model="userInfo">
      <el-form-item label="名字">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="userInfo.sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="userInfo.age"></el-input>
      </el-form-item>
    </el-form>
    <button @click="updatamy">确认更新</button>
  </div>
</template>

<script>
export default {
  name: 'v-from',
  props: ['title', 'list'],
  data () {
    return {
      userInfo: {}
    }
  },
  created: function () {
    let myneedid = JSON.parse(localStorage.userInfo).id
    this.$api.post(
      '/users/getUserById',
      {
        'id': myneedid
      },
      response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          this.$data.userInfo = response.data[0]
          console.log(this.$data.userInfo, '个人信息')
        } else {
          console.log(response.message)
        }
      }
    )
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    updatamy () {
      this.$api.post(
        '/users/update',
        this.$data.userInfo,
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            if (response.data.msg === 'succeed') {
              this.$api.post(
                '/users/getUserById',
                {
                  'id': this.$data.userInfo.id
                },
                response => {
                  if (response.status >= 200 && response.status < 300) {
                    console.log(response.data)
                    this.$data.userInfo = response.data[0]
                    console.log(this.$data.userInfo, '个人信息')
                    this.$message({
                      message: '恭喜您修改成功',
                      type: 'success'
                    })
                  } else {
                    console.log(response.message)
                  }
                }
              )
            }
          } else {
            console.log(response.message)
            this.$message.error('错了哦，这是一条错误消息')
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.myfrom {
  text-align: left;
  background: white;
}
</style>
