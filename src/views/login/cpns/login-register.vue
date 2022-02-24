<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="passwordword"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpassword">
      <el-input
        v-model="ruleForm.checkpassword"
        type="passwordword"
        autocomplete="off"
        placeholder="请确认密码"
      ></el-input>
    </el-form-item>
    <el-button
      type="primary"
      size="large"
      class="register-Btn"
      @click="loginAction"
      >注册</el-button
    >
    <div></div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import { useStore } from 'vuex'

//表单验证逻辑
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const validatepassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkpassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkpassword', () => null)
    }
    callback()
  }
}
const validatepassword2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error('两次密码不匹配'))
  } else {
    callback()
  }
}
const ruleForm = reactive({
  password: '',
  checkpassword: '',
  username: ''
})
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名只能是5到10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, validator: validatepassword, trigger: 'blur' }],
  checkpassword: [
    { required: true, validator: validatepassword2, trigger: 'blur' }
  ]
})

const store = useStore()
//按钮注册点击逻辑
const loginAction = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      //开始注册
      store.dispatch('reg/accountRegAction', { ...ruleForm })
    }
  })
}
</script>
<style scoped>
.register-Btn {
  display: block;
  margin: 0 auto;
  width: 100px;
}
</style>
