<template>
  <div class="main-panel">
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-user-solid"></i> 会议创建</span>
        </template>
        <main-cream></main-cream>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-user"></i> 加入会议</span>
        </template>
        <main-enterm></main-enterm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mainCream from './main-cream'
import mainEnterm from './main-enterm'
export default {
  components: {
    mainCream,
    mainEnterm
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.main-panel {
  width: 320px;
  margin-bottom: 130px;
}
</style>
