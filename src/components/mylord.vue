<template>
  <el-container style="height: 100%;width:100%; border: 1px solid #eee;position:fixed; top: 0; right:0;background: #ddd;">
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="1"
                      @click="showtable('isshow')">
          <i class="el-icon-setting"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>患者操作</template>
          <el-menu-item index="2-1"
                        @click="showtable('isshowuser')">患者信息表操作</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>医生/医院操作</template>
          <el-menu-item index="3-1"
                        @click="showtable('isshowdoctor')">医生信息表操作</el-menu-item>
          <el-menu-item index="3-2"
                        @click="showtable('isshowhospital')">医院信息表操作</el-menu-item>
          <el-menu-item index="3-3"
                        @click="showtable('isshowOverview')">就医历史表操作</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-message"></i>权限操作</template>
          <el-menu-item index="4-1"
                        @click="showtable('isshowquanxian')">管理者权限</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="loginout">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">返回客户端</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main style="padding:0">
        <div v-show="isshow"
             id="myChart"
             :style="{width: '600px', height: '600px'}">
        </div>
        <el-table v-show="isshowuser"
                  :data="userdata"
                  style="">
          <el-table-column fixed
                           prop="id"
                           label="id">
          </el-table-column>
          <el-table-column prop="username"
                           label="姓名">
          </el-table-column>
          <el-table-column prop="sex"
                           label="性别">
          </el-table-column>
          <el-table-column prop="rfid"
                           label="身份证号">
          </el-table-column>
          <el-table-column prop="adress"
                           label="地址">
          </el-table-column>
          <el-table-column prop="age"
                           label="年龄">
          </el-table-column>
          <el-table-column prop="phone"
                           label="手机号">
          </el-table-column>
          <el-table-column prop="password"
                           label="密码"
                           v-show="false">
          </el-table-column>
          <el-table-column prop="isadmin"
                           label="是否是管理员"
                           v-show="false">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showtc(scope.$index, scope.row,'dialogFormuser')">Edit</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="deluser(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="用户信息修改"
                   :visible.sync="dialogFormuser"
                   append-to-body>
          <el-form label-position="left"
                   label-width="80px"
                   :model="tceditobj">
            <el-form-item label="id">
              <el-input v-model="tceditobj.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="tceditobj.username"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="tceditobj.sex"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="tceditobj.rfid"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="tceditobj.adress"></el-input>
            </el-form-item>
            <el-form-item label="是否是管理员">
              <el-input v-model="tceditobj.isadmin"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="tceditobj.phone"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="tceditobj.age"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="tceditobj.password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormuser = false">取 消</el-button>
            <el-button type="primary"
                       @click="postedit()">确 定</el-button>
          </div>
        </el-dialog>
        <el-table v-show="isshowdoctor"
                  :data="doctordata"
                  style="">
          <el-table-column fixed
                           prop="hsid"
                           label="id">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名">
          </el-table-column>
          <el-table-column prop="sex"
                           label="性别">
          </el-table-column>
          <el-table-column prop="office"
                           label="科室">
          </el-table-column>
          <el-table-column prop="abstract"
                           label="介绍">
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.img"
                   class="doctorimg" />
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="isshowhospital"
                  :data="hospitaldata"
                  style="">
          <el-table-column fixed
                           prop="hsid"
                           label="id">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名">
          </el-table-column>
          <el-table-column prop="address"
                           label="地址">
          </el-table-column>
          <el-table-column prop="abstract"
                           label="介绍">
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.img"
                   class="doctorimg" />
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="isshowOverview"
                  :data="Overviewdata"
                  style="">
          <el-table-column fixed
                           prop="id"
                           label="id">
          </el-table-column>
          <el-table-column prop="time"
                           label="时间">
          </el-table-column>
          <el-table-column prop="userid"
                           label="用户id">
          </el-table-column>
          <el-table-column prop="ysid"
                           label="医生id">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="isshowquanxian"
                  :data="userdata"
                  style="">
          <el-table-column fixed
                           prop="id"
                           label="id">
          </el-table-column>
          <el-table-column prop="username"
                           label="姓名">
          </el-table-column>
          <el-table-column prop="sex"
                           label="性别">
          </el-table-column>
          <el-table-column prop="rfid"
                           label="身份证号">
          </el-table-column>
          <el-table-column prop="adress"
                           label="地址">
          </el-table-column>
          <el-table-column prop="age"
                           label="年龄">
          </el-table-column>
          <el-table-column prop="phone"
                           label="手机号">
          </el-table-column>
          <el-table-column prop="password"
                           label="密码"
                           v-show="false">
          </el-table-column>
          <el-table-column prop="isadmin"
                           label="是否是管理员"
                           v-show="false">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="glycz(scope.row)">升级为管理员</el-button>
              <el-button size="mini"
                         @click="glycz(scope.row)">取消管理员</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'mylord',
  mounted () {
    this.drawLine()
    this.getalluser()
    this.getalldoctor()
    this.getalhospital()
    this.getallOverview()
  },

  methods: {
    glycz (user) {
      console.log('yonghu', user)
    },
    deluser (user) {
      console.log(user, '用户')
      this.$api.delete(
        '/users/delete',
        {
          'id': user.id
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.getalluser()
          } else {
            this.$notifye.error({
              title: '错误',
              message: '删除失败'
            })
          }
        }
      )
    },
    postedit () {
      console.log(this.tceditobj, '当前修改提交数据')
      this.$api.post(
        '/users/update',
        {
          'id': this.tceditobj.id,
          'username': this.tceditobj.username,
          'sex': this.tceditobj.sex,
          'rfid': this.tceditobj.rfid,
          'adress': this.tceditobj.adress,
          'phone': this.tceditobj.phone,
          'password': this.tceditobj.password,
          'age': this.tceditobj.age,
          'isadmin': this.tceditobj.isadmin
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormuser = false
            this.tceditobj = { id: null, username: null, sex: null, rfid: null, adress: null, phone: null, password: null, age: null, isadmin: null }
          } else {
            this.$notifye.error({
              title: '错误',
              message: '修改失败'
            })
          }
        }
      )
    },
    loginout (index) {
      if (index === 'b') {
        localStorage.clear()
      }
      this.$router.push({ name: 'home' })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    showtable (indexname) {
      // 控制显示数组
      var showarr = ['isshow', 'isshowuser', 'isshowdoctor', 'isshowhospital', 'isshowOverview', 'isshowquanxian']
      for (let i = 0; i < showarr.length; i++) {
        if (indexname === showarr[i]) {
          this[showarr[i]] = true
        } else {
          this[showarr[i]] = false
        }
      }
    },
    showtc (index, row, indexname) {
      console.log('传递信息', index, row, indexname)
      this.tceditobj = row
      this[indexname] = true
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))

      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })
    },
    getalluser () {
      this.$api.get(
        '/users/get',
        {},
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.userdata = response.data
            console.log(this.userdata, '患者数据')
          } else {
            console.log(response.message)
          }
        }
      )
    },
    getalldoctor () {
      this.$api.get(
        '/doctor/get',
        {},
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.doctordata = response.data
            console.log(this.doctordata, '医生数据')
          } else {
            console.log(response.message)
          }
        }
      )
    },
    getalhospital () {
      this.$api.get(
        '/hospital/get',
        {},
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.hospitaldata = response.data
            console.log(this.hospitaldata, '医院数据')
          } else {
            console.log(response.message)
          }
        }
      )
    },
    getallOverview () {
      this.$api.get(
        '/Overview/get',
        {},
        response => {
          if (response.status >= 200 && response.status < 300) {
            this.Overviewdata = response.data
            console.log(this.Overviewdata, '挂号历史数据')
          } else {
            console.log(response.message)
          }
        }
      )
    }
  },
  data () {
    return {
      username: null,
      userInfo: null,
      isshow: true,
      isshowuser: false,
      isshowdoctor: false,
      isshowhospital: false,
      isshowOverview: false,
      isshowquanxian: false,
      search: '',
      userdata: null,
      doctordata: null,
      hospitaldata: null,
      Overviewdata: null,
      dialogFormuser: false,
      tceditobj: { id: null, username: null, sex: null, rfid: null, adress: null, phone: null, password: null, age: null, isadmin: null }

    }
  },
  created: function () {
    if (localStorage.userInfo) {
      this.username = JSON.parse(localStorage.userInfo).username
      this.userInfo = JSON.parse(localStorage.userInfo).userInfo
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.doctorimg {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
