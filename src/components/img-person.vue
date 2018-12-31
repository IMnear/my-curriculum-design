<template>
  <div>
    <img src="../assets/img/vv.jpg"
         alt=""
         usemap="#vv">
    <map name="#vv"
         id="#vv">
      <area shape="rect"
            coords="10,10,100,100"
            @click="doHeader"
            alt="头">
    </map>
  </div>
</template>

<script>
export default {
  name: 'img-person',
  data () {
    return {
      msg: '开始'
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
