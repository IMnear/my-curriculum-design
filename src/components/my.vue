<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'my',
  data () {
    return {
      msg: '我的'
    }
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
    function getLocation () {
      if (navigator.geolocation) {
        console.log('进入')
        navigator.geolocation.getCurrentPosition(showPosition)
      } else { console.log('Geolocation is not supported by this browser.') }
    }
    function showPosition (position) {
      console.log('ok')
      console.log(position.coords.latitude, position.coords.longitude)
    }
    getLocation()
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
