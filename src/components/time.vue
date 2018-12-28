<template>
  <div>
    {{msg}}{{title}}
    <div v-for="x in list"
         v-bind:key="x.id">{{x.name}}</div>
    <input type="text"
           v-model="tofather">
    <button v-on:click="$emit('enlarge-text', tofather)">发送</button>
    <!-- solt 父组件里面写的内容会默认到solt里面 -->
    <slot></slot>
    <input type="file"
           ref="imginput"
           v-on:change="imgchange">
    <img src=""
         alt=""
         id="myimg">
  </div>
</template>

<script>
export default {
  name: 'v-time',
  props: ['title', 'list'],
  data () {
    return {
      msg: '新闻',
      tofather: ''
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
    }
  }
}
</script>

<style scoped>
</style>
