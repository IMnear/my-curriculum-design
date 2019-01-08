<template>
  <div class="list">
    <h1>MY toDoList(我需要做的事)</h1>
    <div class="input-from">
      <el-input v-model="input"
                placeholder="请输入要做的事"></el-input>
      <el-button plain
                 @click="pushlist">确定</el-button>
    </div>
    <ul class="live"
        v-for="x in mylist"
        :key="x.index">
      <li>{{x}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'v-time',
  props: ['title', 'list'],
  data () {
    return {
      msg: '需要做的事',
      tofather: '',
      input: '',
      mylist: []
    }
  },
  created: function () {
  },
  methods: {
    doHeader () {
      console.log('这是头')
    },
    imgchange () {
      console.log('进入')
      let preview = this.$refs.myimg
      // 获取得到file 对象
      var file = this.$refs.imginput
      // 限制上传图片的大小
      if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过 2MB!')
        return false
      }
      // 创建url
      var imgUrl = this.$window.URL.createObjectURL(file)
      preview.setAttribute('src', imgUrl)
      // 更改img url 以后释放 url
      preview.onload = function () {
        // console.log('图片加载成功')
        URL.revokeObjectURL(imgUrl)
      }
    },
    pushlist () {
      this.$data.mylist.push(this.$data.input)
      console.log(this.$data.mylist, '需要做的事情列表')
      this.$data.input = ''
    }
  }
}
</script>

<style>
.list {
  margin-top: 80px;
  padding: 30px;
  text-align: center;
  background-image: -webkit-radial-gradient(circle, #3c3b52 0%, #252233 80%);
  background-image: radial-gradient(circle, #3c3b52 0%, #252233 80%);
}
.input-from {
  display: flex;
  justify-content: space-around;
}
h1 {
  margin: 0.5em 0 0;
  padding: 0;
  text-shadow: 0 4px rgba(0, 0, 0, 0.2);
}

* {
  -moz-box-sizing: padding-box;
  box-sizing: padding-box;
}

ol,
ul {
  width: 28%;
  display: inline-block;
  text-align: left;
  vertical-align: top;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  padding: 1.5em;
  margin: 2%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.live {
  overflow: hidden;
  width: 80%;
}
.live > li {
  list-style: none;
  position: relative;
  padding: 0 0 0 2em;
  margin: 0 0 0.5em 10px;
  -webkit-transition: 0.12s;
  transition: 0.12s;
}
.live > li::before {
  position: absolute;
  content: "\2022";
  font-family: Arial;
  color: #fff;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 2em;
  opacity: 0.5;
  line-height: 0.75;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.live > li:hover {
  color: #fff;
}
.live > li:hover::before {
  -webkit-transform: scale(2);
  -ms-transform: scale(2);
  transform: scale(2);
  opacity: 1;
  text-shadow: 0 0 4px;
  -webkit-transition: 0.1s;
  transition: 0.1s;
}
.live.type2 > li::before {
  content: "";
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 3px;
  line-height: 0;
  top: 0.27em;
  left: 5px;
}
.live.type2 > li:hover::before {
  -webkit-transform: none;
  -ms-transform: none;
  transform: none;
  border-radius: 5px;
  width: 25px;
  left: -10px;
  background: #ba5353;
}

.live.numbers {
  counter-reset: xxx 0;
}
.live.numbers > li::before {
  content: counter(xxx, decimal) ".";
  counter-increment: xxx 1;
  font-family: "Roboto Condensed";
  font-size: 1em;
  opacity: 0.5;
  line-height: 1.4;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.live.numbers > li:hover:before {
  opacity: 1;
  left: -10px;
  -webkit-transform: none;
  -ms-transform: none;
  transform: none;
  text-shadow: none;
  -webkit-transition: 0.12s;
  transition: 0.12s;
}

@font-face {
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto Condensed Regular"), local("RobotoCondensed-Regular"),
    url(http://themes.googleusercontent.com/static/fonts/robotocondensed/v7/Zd2E9abXLFGSr9G3YK2MsFzqCfRpIA3W6ypxnPISCPA.woff)
      format("woff");
}
</style>
