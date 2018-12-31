<template>
  <div></div>
</template>

<script>
import time from '@/components/time'
export default {
  name: 'registration',
  data () {
    return {
      msg: '挂号',
      list: [{ id: 1, name: 'wo' }, { id: 2, name: 'ni' }],
      mysonsay: ''
    }
  },
  components: {
    'v-time': time
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
    function getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      } else { console.log('Geolocation is not supported by this browser.') }
    }
    function showPosition (position) {
      console.log(position.coords.latitude, position.coords.longitude)
    }
    getLocation()
  },
  methods: {
    doHeader () {
      console.log('这是头')
    },
    fromson (enlargeAmount) {
      console.log(enlargeAmount)
      this.$data.mysonsay = enlargeAmount
    }
  }
}
</script>

<style scoped>
@import "../assets/css/registration-style.css";
</style>
