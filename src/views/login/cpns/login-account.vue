<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="rules"
      :model="account"
      ref="ruleFormRef"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <div class="remember-checkbox">
        <el-checkbox v-model="isRememberSecert" size="small" label="记住密码">
        </el-checkbox>
      </div>
      <el-button
        type="primary"
        size="large"
        class="login-Btn"
        @click="loginAction(isRememberSecert)"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const account = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    //是否记住密码
    type FormInstance = InstanceType<typeof ElForm>
    const ruleFormRef = ref<FormInstance>()
    const isRememberSecert = ref(true)
    const loginAction = (isRememberSecert: boolean) => {
      ruleFormRef.value?.validate(async (valid) => {
        if (valid) {
          if (isRememberSecert) {
            localCache.setCache('username', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }

          //开始登录
          const data = await store.dispatch('login/accountLoginAction', {
            ...account
          })
          // router.replace('/main')
          if (data.status === 0) {
            store.commit('cUserName', { ...account })
            setTimeout(() => {
              router.push('/main')
            }, 1200)
          }
        }
      })
    }

    return {
      account,
      rules,
      isRememberSecert,
      loginAction,
      ruleFormRef
    }
  }
}
</script>

<style scoped>
.login-Btn {
  display: block;
  margin: 0 auto;
  width: 100px;
}
.remember-checkbox {
  margin: 10px 0;
}
</style>
