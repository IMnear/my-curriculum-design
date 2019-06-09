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
        <div v-show="isshow">
          <el-row :gutter="20">
            <el-col :span="18"
                    :offset="4">
              <template>
                <el-carousel :interval="4000"
                             type="card"
                             height="380px">
                  <el-carousel-item v-for="item in imgarry"
                                    :key="item">
                    <div style="width:580px;height:380px">
                      <img :src="item"
                           style="width: 100%;height: 100%;"
                           alt="">
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </template>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div id="myChart"
                     :style="{width: '400px', height: '400px'}"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div id="myChart1"
                     :style="{width: '400px', height: '400px'}"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div id="myChart2"
                     :style="{width: '500px', height: '400px'}"></div>
              </div>
            </el-col>
          </el-row>
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
                         @click="showtc(scope.$index, scope.row,'dialogFormdoctor')">Edit</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="deldoc(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="医生信息修改"
                   :visible.sync="dialogFormdoctor"
                   append-to-body>
          <el-form label-position="left"
                   label-width="80px"
                   :model="tceditobj">
            <el-form-item label="医生id">
              <el-input v-model="tceditobj.ysid"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="tceditobj.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="tceditobj.age"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-input v-model="tceditobj.img"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="tceditobj.sex"></el-input>
            </el-form-item>
            <el-form-item label="科室">
              <el-input v-model="tceditobj.office"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="tceditobj.abstract"></el-input>
            </el-form-item>
            <el-form-item label="医院id">
              <el-input v-model="tceditobj.hsid"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormdoctor = false">取 消</el-button>
            <el-button type="primary"
                       @click="postdocedit()">确 定</el-button>
          </div>
        </el-dialog>
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
                         @click="showtc(scope.$index, scope.row,'dialogFormhospital')">Edit</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="delhospital(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="医院信息修改"
                   :visible.sync="dialogFormhospital"
                   append-to-body>
          <el-form label-position="left"
                   label-width="80px"
                   :model="tceditobj">
            <el-form-item label="医院id">
              <el-input v-model="tceditobj.hsid"></el-input>
            </el-form-item>
            <el-form-item label="医院姓名">
              <el-input v-model="tceditobj.name"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-input v-model="tceditobj.img"></el-input>
            </el-form-item>
            <el-form-item label="医院地址">
              <el-input v-model="tceditobj.address"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="tceditobj.abstract"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormhospital = false">取 消</el-button>
            <el-button type="primary"
                       @click="posthospitaledit()">确 定</el-button>
          </div>
        </el-dialog>
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
          <el-table-column prop="username"
                           label="用户姓名">
          </el-table-column>
          <el-table-column prop="ysid"
                           label="医生id">
          </el-table-column>
          <el-table-column prop="docname"
                           label="医生姓名">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         @click="delOverview(scope.row)">Delete</el-button>
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
                           min-width="120px"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="glycz(scope.row,'1')">升级为管理员</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="glycz(scope.row,'0')">取消管理员</el-button>
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
    this.drawLine1()
    this.drawLine2()
    this.getalluser()
    this.getalldoctor()
    this.getalhospital()
    this.getallOverview()
  },

  methods: {
    glycz (user, flag) {
      console.log('yonghu', user)
      this.$api.post(
        '/users/update',
        {
          'id': user.id,
          'username': user.username,
          'sex': user.sex,
          'rfid': user.rfid,
          'adress': user.adress,
          'phone': user.phone,
          'password': user.password,
          'age': user.age,
          'isadmin': flag
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.getalluser()
          } else {
            this.$notifye.error({
              title: '错误',
              message: '修改失败'
            })
          }
        }
      )
    },
    delOverview (Overview) {
      console.log(Overview, '订单信息')
      this.$api.delete(
        '/Overview/delete',
        {
          'id': Overview.id
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.getalhospital()
          } else {
            this.$notifye.error({
              title: '错误',
              message: '删除失败'
            })
          }
        }
      )
    },
    delhospital (hospital) {
      console.log(hospital, '医院信息')
      this.$api.delete(
        '/hospital/delete',
        {
          'hsid': hospital.hsid
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.getalhospital()
          } else {
            this.$notifye.error({
              title: '错误',
              message: '删除失败'
            })
          }
        }
      )
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
    deldoc (doc) {
      console.log(doc, '医生')
      this.$api.delete(
        '/doctor/delete',
        {
          'ysid': doc.ysid
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.getalldoctor()
          } else {
            this.$notifye.error({
              title: '错误',
              message: '删除失败'
            })
          }
        }
      )
    },
    posthospitaledit () {
      console.log(this.tceditobj, '当前修改提交数据')
      this.$api.post(
        '/hospital/update',
        {
          'name': this.tceditobj.name,
          'img': this.tceditobj.img,
          'abstract': this.tceditobj.abstract,
          'hsid': this.tceditobj.hsid,
          'address': this.tceditobj.address
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormhospital = false
            this.tceditobj = { ysid: null, name: null, age: null, img: null, sex: null, office: null, abstract: null, hsid: null }
          } else {
            this.$notifye.error({
              title: '错误',
              message: '修改失败'
            })
          }
        }
      )
    },
    postdocedit () {
      console.log(this.tceditobj, '当前修改提交数据')
      this.$api.post(
        '/doctor/update',
        {
          'ysid': this.tceditobj.ysid,
          'name': this.tceditobj.name,
          'age': this.tceditobj.age,
          'img': this.tceditobj.img,
          'sex': this.tceditobj.sex,
          'office': this.tceditobj.office,
          'abstract': this.tceditobj.abstract,
          'hsid': this.tceditobj.hsid
        },
        response => {
          console.log(response.data, response.data.msg)
          if (response.data.msg === 'succeed') {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormdoctor = false
            this.tceditobj = { ysid: null, name: null, age: null, img: null, sex: null, office: null, abstract: null, hsid: null }
          } else {
            this.$notifye.error({
              title: '错误',
              message: '修改失败'
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
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart2'))

      var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p']
      var days = ['Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday']

      var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]

      data = data.map(function (item) {
        return [item[1], item[0], item[2] || '-']
      })

      var option = {
        title: {
          text: '医院患者热力图',
          left: 'center',
          top: 20,
          textStyle: {
            color: 'black'
          }
        },
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '50%',
          y: '10%'
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [{
          name: 'Punch Card',
          type: 'heatmap',
          data: data,
          label: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      // 绘制图表
      myChart.setOption(option)
    },
    drawLine1 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      var option = {
        title: {
          text: '医院患者流量表',
          left: 'center',
          top: 20,
          textStyle: {
            color: 'black'
          }
        },
        xAxis: {
          type: 'category',
          data: ['6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [20, 32, 1, 34, 90, 30, 20],
          type: 'line'
        }]
      }

      // 绘制图表
      myChart.setOption(option)
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      var option = {
        backgroundColor: '#2c343c',

        title: {
          text: '医生分布',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '医生分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 3, name: '眼科' },
              { value: 2, name: '脑科' },
              { value: 2, name: '呼吸科' },
              { value: 2, name: '心脏科' },
              { value: 4, name: '牙科' },
              { value: 5, name: '遗传科' },
              { value: 1, name: '肝胆科' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23533',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
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
            var Overviewdata = response.data
            console.log(Overviewdata, '挂号历史数据源')
            console.log(this.userdata, this.doctordata, '用户和医生数据')
            for (var i = 0; i < Overviewdata.length; i++) {
              for (var j = 0; j < this.userdata.length; j++) {
                if (Overviewdata[i].userid === this.userdata[j].id) {
                  Overviewdata[i].username = this.userdata[j].username
                  break
                }
              }
              for (var k = 0; k < this.doctordata.length; k++) {
                if (Overviewdata[i].userid === this.doctordata[k].ysid) {
                  Overviewdata[i].docname = this.doctordata[k].name
                  break
                }
              }
            }
            this.Overviewdata = Overviewdata
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
      dialogFormdoctor: false,
      dialogFormhospital: false,
      tceditobj: { id: null, username: null, sex: null, rfid: null, adress: null, phone: null, password: null, age: null, isadmin: null },
      tceditobjdoctor: { ysid: null, name: null, age: null, img: null, sex: null, office: null, abstract: null, hsid: null },
      imgarry: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560646720&di=ba2169fba50b0ff87a23827975a98c95&imgtype=jpg&er=1&src=http%3A%2F%2Fa1.att.hudong.com%2F40%2F12%2F01300541222586139240128480777.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560052002092&di=ef2074ea9f5f39176fff12887c3f53f9&imgtype=0&src=http%3A%2F%2Fiinfo.zhulong.com%2Fstatic%2Ftech%2Fnew_miniature%2F2510%2F201522174653584_14.jpg%3Ff%3D3',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560052002089&di=6d9c00a5a431473ee99a4261476409e3&imgtype=0&src=http%3A%2F%2Fstatic.jstv.com%2Fimg%2F2018%2F11%2F18%2F201811181542511961287_26.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560052002076&di=b2563f9dd0da8ea3e41c0d6c127bba3b&imgtype=0&src=http%3A%2F%2Ffile1.sheencity.com%2Fdata%2Fbig%2F2012-11%2F01%2F1f11cb25162e874b5c36870ae6ca914a.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560052448820&di=1ca6e5cfa8455925f7219b450a45070d&imgtype=0&src=http%3A%2F%2Fwww.towntour.net%2Fd%2Ffile%2Frmtj%2F2019-06-07%2F109d569f016adc35ca641e3f634f216d.jpg'],
      mytime: new Date()

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
