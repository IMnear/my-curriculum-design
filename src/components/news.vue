<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      msg: '新闻'
    }
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
  },
  methods: {
    doHeader () {
      console.log('这是头')
    }
  }
}
</script>

<style scoped>
</style>
