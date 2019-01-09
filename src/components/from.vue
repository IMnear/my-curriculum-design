<template>
  <div class="mybody">
    <div class="yuan">
      <img src="https://image.flaticon.com/icons/png/128/163/163807.png"
           alt="点击头像查看历史挂号单"
           @click="showmy">
      <p>点击上方头像查看您的历史挂号单</p>
    </div>
    <div class="container">
      <div class="box box1">
        <div class="name">
          <h4>名字</h4>
          <el-input v-model="userInfo.username"></el-input>
        </div>
        <p>{{userInfo.username}}</p>
      </div>
      <div class="box box2">
        <div class="name">
          <h4>性别</h4>
          <el-input v-model="userInfo.sex"></el-input>
        </div>
        <p>{{userInfo.sex}}</p>
      </div>
      <div class="box box3">
        <div class="name">
          <h4>年龄</h4>
          <el-input v-model="userInfo.age"></el-input>
        </div>
        <p>{{userInfo.age}}</p>
      </div>
      <div class="box box2">
        <div class="name">
          <h4>地址</h4>
          <el-input v-model="userInfo.adress"></el-input>
        </div>
        <p>{{userInfo.adress}}</p>
      </div>
      <div class="box box1">
        <div class="name">
          <h4>手机</h4>
          <el-input v-model="userInfo.phone"></el-input>
        </div>
        <p>{{userInfo.phone}}</p>
      </div>
      <div class="box box4">
        <div class="name">
          <el-button type="primary"
                     round
                     @click="updatamy">确认更新</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="历史挂号单"
               :visible.sync="dialogTableVisible"
               :modal-append-to-body='true'
               :modal=false>
      <el-table :data="mylist">
        <el-table-column property="name"
                         label="医生姓名"
                         width="200"></el-table-column>
        <el-table-column property="time"
                         label="挂号时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'v-from',
  props: ['title', 'list'],
  data () {
    return {
      userInfo: {},
      mylist: [],
      dialogTableVisible: false,
      doctorlist: []
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
    this.$api.get(
      '/doctor/get',
      {
      },
      response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data)
          this.$data.doctorlist = response.data
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
    },
    showmy () {
      console.log(this.$data.userInfo)
      this.$api.post(
        '/Overview/my',
        { userid: this.$data.userInfo.id },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            this.$data.mylist = response.data
            for (let i = 0; i < this.$data.mylist.length; i++) {
              for (let j = 0; j < this.$data.doctorlist.length; j++) {
                if (this.$data.mylist[i].ysid === this.$data.doctorlist[j].ysid) {
                  this.$data.mylist[i].name = this.$data.doctorlist[j].name
                }
              }
            }
            this.$data.dialogTableVisible = true
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
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.mybody {
  align-items: center;
  justify-content: center;
  font-family: "Lato", sans-serif;
}

.mybody .container {
  width: 300px;
  font-size: 1.2em;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 30px auto;
}
.mybody .container .box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0px 20px;
  transition: all 0.3s;
  color: white;
}
.mybody .container .box.box1 {
  background-color: #7986cb;
}
.mybody .container .box.box2 {
  background-color: #ff8a65;
}
.mybody .container .box.box3 {
  background-color: #f06292;
}
.mybody .container .box.box4 {
  background-color: #4db6ac;
}
.mybody .container .box .name {
  width: 80px;
}
.mybody .container .box .name h4,
.mybody .container .box .name h5 {
  font-weight: 300;
}
.mybody .container .box .name h5 {
  font-size: 0em;
  line-height: 1.5;
}
.mybody .container .box p {
  font-size: 0.8em;
  font-weight: 300;
}
.mybody .container .box:before {
  content: "";
  height: 0px;
  width: 0px;
  border: 2px solid white;
  border-radius: 50%;
  margin-left: -50%;
  background-color: white;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.mybody .container .box.box1:before,
.mybody .container .box.box3:before {
  background-image: url("https://a1alimo.com/wp-content/uploads/2017/05/011-girl.png");
}
.mybody .container .box.box2:before,
.mybody .container .box.box4:before {
  background-image: url("https://image.flaticon.com/icons/png/128/163/163807.png");
}
.mybody .container .box:hover:before {
  content: "";
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-left: 0%;
  transition: all 0.4s;
}
.mybody .container .box:hover {
  height: 120px;
  transition: all 0.3s;
}
.mybody .container .box:hover .name h5 {
  font-size: 0.7em;
  transition: all 0.6s;
}
</style>
