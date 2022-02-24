<template>
  <div>
    <h1 v-if="meetingInfo.isMeeting">
      当前会议为:{{ meetingInfo.channelName }}
    </h1>
    <el-form label-width="80px" :model="meetingInfo" v-else>
      <el-form-item label="会议名称">
        <el-input
          placeholder="请输入会议名"
          v-model="meetingInfo.channelName"
        />
        <el-button type="primary" class="cream-btn" @click="creaMeeting"
          >创建会议</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const meetingInfo = reactive({
      channelName: '',
      isMeeting: false
    })
    const creaMeeting = async () => {
      const res = await store.dispatch('meeting/meetingCreaAction', {
        channelName: meetingInfo.channelName
      })
      if (res === true) {
        meetingInfo.isMeeting = true
      }
    }
    return {
      meetingInfo,
      creaMeeting
    }
  }
}
</script>

<style scoped>
.cream-btn {
  margin-top: 20px;
  width: 100px;
}
</style>
