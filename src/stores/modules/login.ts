import { login, bindApi } from '@/api/login'
import type { loginType, bindType } from '@/type/login'
import { defineStore } from 'pinia'

const useloginStore = defineStore('login', {
  state: () => ({
    token: '',
    photo: '',
    name: '',
  }),
  actions: {
    async loginAction(dataParams: loginType) {
      const { code, data } = await login(dataParams)
      if (code === 200) {
        this.token = data.token
        this.photo = data.photo
        this.name = data.name
        uni.redirectTo({ url: '/pages/index/index' })
      } else if (code === 10034) {
        uni.showToast({
          icon: 'none',
          title: '账号未绑定，绑定后才能登入',
        })
        uni.navigateTo({ url: '/pages/bind/index' })
      }
    },
    async bindAction(dataParams: bindType) {
      try {
        const { code, data } = await bindApi(dataParams)
        if (code === 200) {
          this.token = data.token
          this.photo = data.photo
          this.name = data.name
          uni.showToast({
            icon: 'none',
            title: '绑定成功',
          })
          uni.redirectTo({ url: '/pages/index/index' })
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
  persist: {
    storage: {
      getItem(key) {
        return uni.getStorageSync(key)
      },
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
    },
  },
})
export default useloginStore
