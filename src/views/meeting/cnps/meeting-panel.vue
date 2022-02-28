<template>
  <div class="row">
    <div>
      <el-button type="primary" @click="join">JOIN</el-button>
      <el-button type="primary" @click="leave">LEAVE</el-button>
    </div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { join, leave, getMeetingInfo } from '../utils/startScreen.js'
export default {
  setup() {
    const store = useStore()
    const containerRef = ref(null)
    watch(containerRef, (newValue, oldValue) => {
      getMeetingInfo(store, newValue)
    })

    return {
      join,
      leave,
      containerRef
    }
  }
}
</script>

<style lang="scss" scoped></style>
