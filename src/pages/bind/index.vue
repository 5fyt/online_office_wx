<template>
  <view>
    <image src="../../static/logo-2.png" mode="widthFix" class="logo" />
    <view class="register_container">
      <input
        placeholder="输入你的用户名"
        class="register-code"
        maxlength="8"
        v-model="form.username"
        placeholder-style="color:#007eff"
      />
      <input
        placeholder="输入你的密码"
        :password="true"
        class="register-code"
        maxlength="10"
        v-model="form.password"
        placeholder-style="color:#007eff"
      />
      <view class="desc">完成绑定后，你才能使用在线办公系统</view>
      <button class="register" @tap="bindHandle">立即绑定</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import useloginStore from '@/stores/modules/login'
const loginStore = useloginStore()
const form = reactive({
  username: '',
  password: '',
})
const bindHandle = () => {
  if (form.username === '' || form.password === '') {
    uni.showToast({
      icon: 'none',
      title: '账号密码未输入，请输入',
    })
    return
  }
  if (
    /^[a-zA-Z0-9_]{4,16}$/.test(form.username) &&
    /^[0-9a-zA-Z]{6,10}$/.test(form.password)
  ) {
    uni.login({
      provider: 'weixin',
      success: async (res) => {
        const { code } = res
        let data = {
          ...form,
          code,
        }
        await loginStore.bindAction(data)
      },
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '账号或密码格式错误，请重新输入',
    })
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
