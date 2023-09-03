import { defineStore } from 'pinia'
const countStore = defineStore('count', {
  state: () => ({
    number: 0,
  }),
  actions: {
    add() {
      this.number += 1
    },
    addTwo() {
      this.number += 2
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
export default countStore
