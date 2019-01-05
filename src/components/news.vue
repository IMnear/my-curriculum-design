<template>
  <div class="content">
    <a class="card"
       href="#!"
       v-for="x in theNew"
       v-bind:key="x.index">
      <div class="front"
           v-show="x.title">
        <p>{{x.title}}</p>
      </div>
      <div class="back">
        <div style="
             overflow:
             hidden;text-overflow:
             ellipsis;white-space:
             nowrap;">
          <p>{{x.item.title}}</p>
          <button class="button"
                  @click="goNews(x)">Click Here</button>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      msg: '新闻',
      theNew: []
    }
  },
  created: function () {
    let objParams = this.$route.params
    console.log(objParams, '路由传参')
    this.$api.get('/reptile/', {}, response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
        this.$data.theNew = response.data
      } else {
        console.log(response)
        // 请求失败，response为失败信息
      }
    })
  },
  methods: {
    doHeader () {
      console.log('这是头')
    },
    goNews (x) {
      console.log(x.item.href)
      window.open(x.item.href, '_blank')
    }
  }
}
</script>

<style scoped>
@import "../assets/css/news.css";
</style>
