<template>
  <div class="all">
    <button @click="gomyclass">{{msg}}</button>
    {{mytitle}}
    <el-input></el-input>
  </div>
</template>

<script>
export default {
  name: 'mylord',
  data () {
    return {
      msg: '进入',
      mytitle: '实现一个分支剧情游戏'
    }
  },
  created: function () {
    console.log('代码在于敲')
  },
  methods: {
    gomyclass () {
      this.$router.push({ path: '/loading' })
    }

  }
}
</script>

<style scoped>
.all {
  background: white;
  height: 1000px;
  width: 100%;
  color: black;
}
</style>
