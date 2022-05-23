<template>
  <div>
    <!-- <h1>Home组件</h1> -->
    <type-nav></type-nav>
    <list-container></list-container>
    <today-recommend></today-recommend>
    <rank></rank>
    <floor v-for="floor in floorList" :key="floor.id" :list="floor"></floor>
    <brand></brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer.vue'
import TodayRecommend from '@/views/Home/TodayRecommend.vue'
import Rank from '@/views/Home/Rank.vue'
import Like from '@/views/Home/Like.vue'
import Floor from '@/views/Home/Floor.vue'
import Brand from '@/views/Home/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    // 派发 action, 获取 floor 组件数据
    this.$store.dispatch('getFloorList')
    // 获取用户信息
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style></style>
