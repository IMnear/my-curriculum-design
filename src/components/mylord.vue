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
                        @click="showtable('isshow1')">患者信息表操作</el-menu-item>
          <el-menu-item index="2-2"
                        @click="showtable('isshow2')">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-menu-item index="2-4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>医生/医院操作</template>
          <el-menu-item index="3-1">医生信息表操作</el-menu-item>
          <el-menu-item index="3-2">医院信息表操作</el-menu-item>
          <el-menu-item index="3-3">就医历史表操作</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-message"></i>权限操作</template>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
          <el-menu-item index="4-3">选项3</el-menu-item>
          <el-menu-item index="4-4">选项4</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{username}}</span>
      </el-header>

      <el-main style="padding:0">
        <div v-show="isshow"
             id="myChart"
             :style="{width: '600px', height: '600px'}">
        </div>
        <el-table v-if="isshow1"
                  :data="tableData"
                  style="width: 100%;height:100%">
          <el-table-column fixed
                           prop="date"
                           label="日期"
                           width="150">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="120">
          </el-table-column>
          <el-table-column prop="province"
                           label="省份"
                           width="120">
          </el-table-column>
          <el-table-column prop="city"
                           label="市区"
                           width="120">
          </el-table-column>
          <el-table-column prop="address"
                           label="地址"
                           width="300">
          </el-table-column>
          <el-table-column prop="zip"
                           label="邮编"
                           width="120">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="120">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                         type="text"
                         size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-if="isshow2"
                  :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
          <el-table-column label="Date"
                           prop="date">
          </el-table-column>
          <el-table-column label="Name"
                           prop="name">
          </el-table-column>
          <el-table-column align="right">
            <template slot="header"
                      slot-scope="scope">
              <el-input v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
  },

  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    showtable (indexname) {
      // 控制显示数组
      var showarr = ['isshow', 'isshow1', 'isshow2']
      for (let i = 0; i < showarr.length; i++) {
        if (indexname === showarr[i]) {
          this[showarr[i]] = true
        } else {
          this[showarr[i]] = false
        }
      }
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
    }
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      username: null,
      userInfo: null,
      isshow: true,
      isshow1: false,
      isshow2: false,
      search: ''
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
</style>
