<template>
  <div>
    <!-- 使用组件 -->
    <Header></Header>
    <router-view></router-view>
    <!-- 显示和隐藏 Footer 组件 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 导入组件
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发一个action，获取商品分类的三级列表的数据
    // 组件挂载完毕，可以向服务器发请求
    // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch('getCategoryList')
  }
}
</script>

<style></style>
