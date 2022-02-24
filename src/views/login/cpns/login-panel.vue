<template>
  <div class="login-panel">
    <h1 class="title">多人会议系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-user"></i> 注册账号</span>
        </template>
        <login-register />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LoginAccount from './login-account.vue'
import LoginRegister from './login-register.vue'
export default {
  components: {
    LoginAccount,
    LoginRegister
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}
.login-panel {
  margin-bottom: 150px;
  width: 320px;
}
</style>
