<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    // 监听 bannerList 数据的变化：空数据 ——> 4个元素
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        // handler 方法执行，则表示数组不为空数组，但是不能保证 v-for 已经执行结束
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
        })
      }
    }
  }
}
</script>

<style></style>
