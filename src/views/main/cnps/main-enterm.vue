<template>
  <div>
    <el-form label-width="80px" :model="meetingInfo">
      <el-form-item label="会议名称">
        <el-input
          placeholder="请输入要加入的会议名"
          v-model="meetingInfo.channelName"
        />
        <el-button type="primary" class="enterm-btn" @click="enterMeeting"
          >加入会议</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const meetingInfo = reactive({
      channelName: ''
    })
    const enterMeeting = () => {
      if (meetingInfo.channelName !== '') {
        router.push('/meeting')
      } else {
        ElMessage({
          message: '会议名不能为空',
          type: 'warning'
        })
      }
    }
    return {
      meetingInfo,
      enterMeeting
    }
  }
}
</script>

<style scoped>
.enterm-btn {
  margin-top: 20px;
  width: 100px;
}
</style>
