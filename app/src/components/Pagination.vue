<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="sendPageNo(pageNo - 1)">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="sendPageNo(1)">1</button>
    <button v-if="startAndEnd.start > 2">···</button>

    <!-- 中 -->
    <button v-for="(page, index) in startAndEnd.end" :key="index" v-show="page >= startAndEnd.start" @click="sendPageNo(page)" :class="{ active: pageNo == page }">{{ page }}</button>

    <!-- 下 -->
    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button v-if="startAndEnd.end < totalPage" @click="sendPageNo(totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="sendPageNo(pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总共页数
    totalPage() {
      // 向上取证
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续的页码起始数字和结束数字
    startAndEnd() {
      // 存储开始和结束数字
      let start = 0
      let end = 0

      // 连续页码
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)

        if (start < 1) {
          start = 1
          end = this.continues
        }

        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1
          end = this.totalPage
        }
      }
      return { start, end }
    }
  },
  methods: {
    sendPageNo(pageNo) {
      this.$emit('getPageNo', pageNo)
      console.log('page', pageNo)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: pink;
      color: #fff;
    }
  }
}
</style>
