<template>
  <div>
    <h3>点击图片中的身体部位去问诊把~</h3>
    <img src="../assets/img/body.jpg"
         alt=""
         usemap="#vv">
    <map name="#vv"
         id="#vv">
      <area shape="circ"
            coords="775,278,64"
            @click="showFrom('脑科')"
            target="_blank"
            alt="脑科"
            title="脑科">
      <area shape="circ"
            coords="775,419,64"
            @click="showFrom('呼吸科')"
            target="_blank"
            alt="呼吸科"
            title="呼吸科">
      <area shape="circ"
            coords="775,571,64"
            @click="showFrom('心脏科')"
            target="_blank"
            alt="心脏科"
            title="心脏科">
      <area shape="circ"
            coords="775,714,64"
            @click="showFrom('牙科')"
            target="_blank"
            alt="牙科"
            title="牙科">
      <area shape="circ"
            coords="775,857,64"
            @click="showFrom('遗传科')"
            target="_blank"
            alt="遗传科"
            title="遗传科">
      <area shape="circ"
            coords="921,278,64"
            @click="showFrom('肝胆科')"
            target="_blank"
            alt="肝胆科"
            title="肝胆科">
      <area shape="circ"
            coords="921,419,64"
            @click="showFrom('胃肠科')"
            target="_blank"
            alt="胃肠科"
            title="胃肠科">
      <area shape="circ"
            coords="921,571,64"
            @click="showFrom('胃肠科')"
            target="_blank"
            alt="胃肠科"
            title="胃肠科">
      <area shape="circ"
            coords="921,714,64"
            @click="showFrom('泌尿科')"
            target="_blank"
            alt="泌尿科"
            title="泌尿科">
      <area shape="circ"
            coords="921,857,64"
            @click="showFrom('眼科')"
            target="_blank"
            alt="眼科"
            title="眼科">
    </map>
    <el-dialog title="挂号信息"
               :visible.sync="dialogFormVisible"
               :modal=false>
      <el-form>
        <el-form-item label="选择医生">
          <el-select v-model="doctorysid"
                     placeholder="请选择医生">
            <el-option v-for="item in doctorList"
                       :key="item.ysid"
                       :label="item.name"
                       :value="item.ysid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="guahao">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'img-person',
  data () {
    return {
      msg: '开始',
      dialogTableVisible: false,
      dialogFormVisible: false,
      doctorList: [],
      userInfo: {},
      formLabelWidth: '120px',
      doctorysid: null
    }
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
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
    doHeader () {
      console.log('这是头')
    },
    showFrom (classname) {
      this.$data.dialogFormVisible = true
      this.$api.post(
        '/doctor/getDoctorBy',
        {
          'type': 'office',
          'value': classname
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            this.$data.doctorList = response.data.doctor
          } else {
            console.log(response.message)
          }
        }
      )
    },
    guahao () {
      console.log('医生', this.$data.doctorysid)
      this.$data.dialogFormVisible = false
      this.$api.post(
        '/Overview/add',
        {
          ysid: this.$data.doctorysid,
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
    }
  }
}
</script>

<style scoped>
</style>
