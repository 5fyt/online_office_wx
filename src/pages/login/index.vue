<template>
  <view>
    <image src="../../static/logo-1.png" mode="widthFix" class="logo" />
    <view class="login_title">EMOS企业在线办公系统</view>
    <view class="login_copyright">Ver 2050.2</view>
    <button
      class="login"
      :disabled="disabled"
      :loading="loading"
      open-type="getUserInfo"
      @tap="login"
    >
      登入系统
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useloginStore from '@/stores/modules/login'
const loginStore = useloginStore()
const disabled = ref(false)
const loading = ref(false)
//登入功能
const login = () => {
  uni.login({
    provider: 'weixin', //使用微信登录
    success: async function (res) {
      try {
        let { code } = res
        loading.value = true
        disabled.value = true
        loginStore.loginAction({ code: code })
        console.log('s')
        loading.value = false
        disabled.value = false
      } catch {}
    },
    fail: (fail) => {},
  })
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
