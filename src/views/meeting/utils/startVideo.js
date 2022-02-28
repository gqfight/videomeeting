import axios from 'axios'
import AgoraRTC from 'agora-rtc-sdk-ng'
let rtc = {
  localAudioTrack: null,
  locaVdeioTrack: null,
  client: null
}
let options = {
  appId: '',
  channel: '',
  token: '',
  uid: 0
}
let container = null
//获取会议信息
const getMeetingInfo = async (store, Ccontainer) => {
  container = Ccontainer
  const username = store.state.login.userinfo.username
  const channelName = store.state.meeting.channelName
  const res = await axios({
    method: 'POST',
    url: 'http://127.0.0.1:3007/api/meetinginfo',
    params: {
      channelName,
      username
    }
  })
  const data = res.data
  options.appId = data.appID
  options.uid = data.id
  options.channel = channelName
  options.token = store.state.meeting.mtoken
  console.log(container)
}
async function join() {
  await rtc.client.join(
    options.appId,
    options.channel,
    options.token,
    options.uid
  )
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack()
  await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack])
  const localPlayerContainer = document.createElement('div')
  localPlayerContainer.id = options.uid
  localPlayerContainer.textContent = 'Local user ' + options.uid
  localPlayerContainer.style.width = '640px'
  localPlayerContainer.style.height = '480px'
  localPlayerContainer.style.marginBottom = '20px'
  container.append(localPlayerContainer)
  rtc.localVideoTrack.play(localPlayerContainer)
  console.log('publish success!')
}
async function leave() {
  rtc.localAudioTrack.close()
  rtc.localVideoTrack.close()
  rtc.client.remoteUsers.forEach((user) => {
    const playerContainer = document.getElementById(user.uid)
    playerContainer && playerContainer.remove()
  })
  await rtc.client.leave()
}
async function startBasicCall() {
  //创建声网客户端对象用于通话
  rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
  //监听远端用户加入频道
  rtc.client.on('user-published', async (user, mediaType) => {
    //订阅远端用户对象
    await rtc.client.subscribe(user, mediaType)
    console.log('subscribe success')
    if (mediaType === 'video') {
      const remoteVideoTrack = user.videoTrack
      const remotePlayerContainer = document.createElement('div')
      remotePlayerContainer.id = user.uid.toString()
      remotePlayerContainer.textContent = 'Remote user ' + user.uid.toString()
      remotePlayerContainer.style.width = '640px'
      remotePlayerContainer.style.height = '480px'
      remotePlayerContainer.style.marginBottom = '20px'
      container.append(remotePlayerContainer)
      remoteVideoTrack.play(remotePlayerContainer)
    }
    if (mediaType === 'audio') {
      const remoteAudioTrack = user.audioTrack
      remoteAudioTrack.play()
    }
    rtc.client.on('user-unpublished', (user) => {
      const remotePlayerContainer = document.getElementById(user.uid)
      remotePlayerContainer.remove()
    })
  })
}
startBasicCall()
export { getMeetingInfo, join, leave }
